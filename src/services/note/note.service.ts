import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from '../../entity/note.entity.js';
import { Note as NoteModel } from '../../models/notes/base.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async read(payload: { limit?: number; offset?: number }): Promise<Note[]> {
    const { limit, offset } = payload;
    return this.noteRepository.find({
      take: limit ?? 20,
      skip: offset ?? 0,
    });
  }

  async readById(id: number): Promise<Note | null> {
    return this.noteRepository.findOne({ where: { id } });
  }

  async createNote(note: NoteModel): Promise<Note> {
    return this.noteRepository.save(note);
  }
}
