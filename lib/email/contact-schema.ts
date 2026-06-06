import { z } from 'zod'

/**
 * Server-trusted schema for contact form submissions.
 * Both /api/contact and the client form derive their types from this.
 */
export const contactSchema = z.object({
  name:    z.string().trim().min(2, 'Bitte vollständigen Namen angeben').max(120),
  email:   z.email('Bitte gültige E-Mail-Adresse').max(200),
  phone:   z.string().trim().max(40).optional().or(z.literal('')),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  volume:  z.number().int().min(0).max(10_000_000),
  psp:     z.string().trim().max(80).optional().or(z.literal('')),
  branch:  z.string().trim().max(80).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  /** Honeypot — checked in the route handler, not by schema. */
  website: z.string().max(2000).optional(),
})

export type ContactPayload = z.infer<typeof contactSchema>
