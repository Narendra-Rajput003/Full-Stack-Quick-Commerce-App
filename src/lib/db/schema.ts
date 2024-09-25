import { sql } from "drizzle-orm";
import { pgTable ,serial, varchar, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";


const roleEnum=pgEnum('role', ['admin', 'customer'])

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    fname: varchar("fname", { length: 100 }).notNull(),
    lname: varchar("lname", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    provider: varchar("provider", { length: 20 }),
    external_id: varchar("external_id", { length: 100 }).notNull().unique(),
    image: text("image"),
    role: roleEnum('role').notNull().default('customer'),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    image: text("image"),
    description: text("description"),
    price: integer("price").notNull(),
    updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});
