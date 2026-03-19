import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NoteModule } from './services/note/note.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entity/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Note],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true,
    }),
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
