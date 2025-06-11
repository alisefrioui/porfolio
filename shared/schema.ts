import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioSettings = pgTable("portfolio_settings", {
  id: serial("id").primaryKey(),
  profilePicture: text("profile_picture"),
  cvPdfPath: text("cv_pdf_path"),
  skills: text("skills"),
  experience: text("experience"),
  certifications: text("certifications"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPortfolioSettingsSchema = createInsertSchema(portfolioSettings).omit({
  id: true,
  updatedAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertPortfolioSettings = z.infer<typeof insertPortfolioSettingsSchema>;
export type PortfolioSettings = typeof portfolioSettings.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
