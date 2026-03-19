import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { DatabaseModule } from '../../providers/database/database.module';
import { noteProviders } from '../../providers/note.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...noteProviders, NoteService],
})
export class NoteModule {}
