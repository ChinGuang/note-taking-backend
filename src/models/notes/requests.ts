import { z } from 'zod';
import { StringUtils } from '../../utils/string.js';

export const CreateNoteRequestZod = z.object({
  title: z.string().transform((val) => StringUtils.sanitizeString(val)),
  content: z.string().transform((val) => StringUtils.sanitizeString(val)),
});

export type CreateNoteRequest = z.infer<typeof CreateNoteRequestZod>;
