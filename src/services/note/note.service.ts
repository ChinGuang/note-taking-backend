import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from '../../entity/note.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async read(payload: { limit?: number; offset?: number }) {
    const { limit, offset } = payload;
    return this.noteRepository.find({
      take: limit ?? 20,
      skip: offset ?? 0,
    });
  }
}
