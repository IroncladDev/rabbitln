import { dbClient } from "@/lib/drizzle/db"
import { user } from "@/lib/drizzle/schema"
import { getSession } from "@/lib/server/auth"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { eq } from "drizzle-orm"
import OpenAI from "openai"
import {
  ChatCompletionContentPartImage,
  ChatCompletionMessage,
} from "openai/resources/index.mjs"
import { z } from "zod"

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const streamingChatInput = z.object({
  type: z.enum(["text", "multimodal"]),
  text: z.string(),
  images: z.array(z.string()).optional(),
  messages: z.array(z.any()),
  // TODO: enumerated chat modes
})

export async function POST(req: Request) {
  const session = await getSession()

  try {
    if (!session) throw new Error("Unauthorized, please log in")

    const { type, text, images, messages } = streamingChatInput.parse(
      await req.json(),
    )

    if (type === "text" && Array.isArray(images))
      throw new Error("Images can only be sent for Multimodal requests")

    if (session.user.balance < 1) throw new Error("Insufficient balance")

    const db = await dbClient

    // TODO: implement completion token costs
    const calculatedCompletionTokens = 200

    const response = await openai.chat.completions.create({
      model: type === "text" ? "gpt-3.5-turbo-1106" : "gpt-4-vision-preview",
      stream: true,
      messages: [
        ...(messages as Array<ChatCompletionMessage>),
        type === "text"
          ? {
              role: "user",
              content: text,
            }
          : {
              role: "user",
              content: [
                {
                  type: "text",
                  text,
                },
                ...(images || []).map(
                  url =>
                    ({
                      type: "image_url",
                      image_url: {
                        url,
                      },
                    }) as ChatCompletionContentPartImage,
                ),
              ],
            },
      ],
      max_tokens: calculatedCompletionTokens,
    })

    // TODO: implement balance meter
    let tokens = 0

    const stream = OpenAIStream(response, {
      async onFinal() {
        await db
          .update(user)
          .set({
            balance: session.user.balance - tokens,
          })
          .where(eq(user.id, session.userId))
      },
      onToken: () => {
        tokens++
      },
    })

    return new StreamingTextResponse(stream)
  } catch (err) {
    return new Response((err as Error).message)
  }
}
