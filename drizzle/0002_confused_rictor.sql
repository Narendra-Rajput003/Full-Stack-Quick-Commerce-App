ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE role;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_external_id_unique" UNIQUE("external_id");