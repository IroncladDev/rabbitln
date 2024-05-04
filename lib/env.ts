import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_ENV: z.enum(["development", "preview", "production"]),
  ASSEMBLYAI_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
  BASE_URL: z.string().url(),
  PASSWORD: z.string(),
})

envSchema.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
