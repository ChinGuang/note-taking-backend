import { Injectable } from '@nestjs/common';
import { NoteService } from './services/note/note.service';
import { Note } from './models/notes/base';

@Injectable()
export class AppService {
  constructor(private readonly noteService: NoteService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getNotes(payload: { limit?: number; offset?: number }): Promise<Note[]> {
    return this.noteService.read(payload);
  }

  createNote(note: Note): Promise<Note> {
    return this.noteService.createNote(note);
  }
}
