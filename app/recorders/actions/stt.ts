"use server"

import { ServerActionResult } from "@/app/types/utils"
import { formatError } from "@/lib/errors"
import { z } from "zod"
import { AssemblyAI } from "assemblyai"

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
})

const speechToTextInput = z.object({
  dataUrl: z.string(),
})

export async function speechToText(
  input: z.infer<typeof speechToTextInput>,
): ServerActionResult<{ text: string }> {
  try {
    const { dataUrl } = speechToTextInput.parse(input)

    const { text } = await client.transcripts.create({
      audio_url: dataUrl,
    })

    if (!text) throw new Error("Failed to generate transcript")

    return { success: true, text }
  } catch (e) {
    return {
      success: false,
      message: formatError(e),
    }
  }
}
