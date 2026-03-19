import { Note } from './base';

export interface GetNotesResponse {
  message: string;
  notes: Note[];
}
