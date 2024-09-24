import { connection, db } from "@/lib/db/db"
import { migrate } from "drizzle-orm/node-postgres/migrator"

(async () => {
    await migrate(db as any, { migrationsFolder: './drizzle' })
    await connection.end()
})()