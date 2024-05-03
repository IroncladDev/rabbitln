DROP TABLE "_prisma_migrations";--> statement-breakpoint
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";
--> statement-breakpoint
DROP INDEX IF EXISTS "User_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "User_pubkey_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Session_id_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Session_userId_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Session_token_key";--> statement-breakpoint
DROP INDEX IF EXISTS "Session_sigToken_key";--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "timeCreated" SET DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_pubkey_unique" UNIQUE("pubkey");--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_unique" UNIQUE("userId");--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_sigToken_unique" UNIQUE("sigToken");