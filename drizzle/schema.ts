import { pgTable, timestamp, text, integer, serial } from "drizzle-orm/pg-core"
import { InferSelectModel, relations } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"

/** Models */
export const user = pgTable("User", {
  id: serial("id").primaryKey().notNull().unique(),
  pubkey: text("pubkey").notNull().unique(),
  timeCreated: timestamp("timeCreated", {
    precision: 3,
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
})

export const session = pgTable("Session", {
  id: serial("id").primaryKey().notNull().unique(),
  userId: integer("userId")
    .notNull()
    .references(() => user.id, { onDelete: "restrict", onUpdate: "cascade" })
    .unique(),
  token: text("token")
    .notNull()
    .unique()
    .$default(() => createId()),
  sigToken: text("sigToken")
    .notNull()
    .unique()
    .$default(() => createId()),
})

/** Relations */
export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const userRelations = relations(user, ({ one }) => ({
  session: one(session),
}))

/** Types */
export type User = InferSelectModel<typeof user>
export type Session = InferSelectModel<typeof session>
