import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteService } from './services/note/note.service.js';
import { Note } from './models/notes/base.js';
import { marked } from 'marked';

@Injectable()
export class AppService {
  constructor(private readonly noteService: NoteService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getRenderedNote(id: number): Promise<string> {
    const note = await this.noteService.readById(id);
    if (!note) {
      throw new NotFoundException();
    }
    const rendered = marked.parse(note.content);
    return rendered;
  }

  getNotes(payload: { limit?: number; offset?: number }): Promise<Note[]> {
    return this.noteService.read(payload);
  }

  createNote(note: Note): Promise<Note> {
    return this.noteService.createNote(note);
  }
}
