import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NoteModule } from './services/note/note.module';

@Module({
  imports: [ConfigModule.forRoot(), NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
