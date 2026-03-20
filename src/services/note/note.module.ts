import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from '../../entity/note.entity.js';
import { NoteService } from './note.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
