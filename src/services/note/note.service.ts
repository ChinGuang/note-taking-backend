import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from '../../entity/note.entity';
import { NOTE_REPOSITORY } from '../../utils/constants';

@Injectable()
export class NoteService {
  constructor(
    @Inject(NOTE_REPOSITORY)
    private readonly noteRepository: Repository<Note>,
  ) {}
}
