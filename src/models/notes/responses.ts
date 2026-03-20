import { z } from 'zod';
import { NoteZod } from './base.js';

export const GetNotesResponseZod = z.object({
  message: z.string(),
  notes: z.array(NoteZod.extend({ id: z.number().int() })),
});

export type GetNotesResponse = z.infer<typeof GetNotesResponseZod>;

export const CreateNoteResponseZod = z.object({
  message: z.string(),
  note: NoteZod.extend({ id: z.number().int() }).optional(),
});

export type CreateNoteResponse = z.infer<typeof CreateNoteResponseZod>;
