import { pgTable, pgSequence, text, integer, timestamp } from "drizzle-orm/pg-core";

// Internal row counter ("No" column in Google Sheets). Public IDs are random (ARIJU-7F9K2BQX).
// Postgres sequences are atomic, so simultaneous quiz finishers never get the same number.
export const certificateSerialSeq = pgSequence("certificate_serial_seq", { startWith: 1, increment: 1 });

export const certificates = pgTable("certificates", {
  id: text().primaryKey(),
  serial: integer().unique(),
  recipientName: text("recipient_name").notNull(),
  country: text(),
  quizName: text("quiz_name").notNull(),
  score: integer().notNull(),
  total: integer().notNull(),
  scoreText: text("score_text").notNull(),
  issuedAt: timestamp("issued_at", { withTimezone: true }).notNull().defaultNow(),
});
