import {
  Body,
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service.js';
import {
  CreateNoteResponse,
  CreateNoteResponseZod,
  GetNotesResponse,
  GetNotesResponseZod,
} from './models/notes/responses.js';
import {
  CreateNoteRequest,
  CreateNoteRequestZod,
} from './models/notes/requests.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('notes')
  async getNotes(
    @Query() query: { limit?: number; offset?: number },
  ): Promise<GetNotesResponse> {
    try {
      const notes = await this.appService.getNotes(query);
      return GetNotesResponseZod.parse({
        message: 'Notes retrieved successfully',
        notes,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Notes retrieval failed');
    }
  }

  @Get('notes/:id/rendered')
  @Header('Content-Type', 'text/html')
  async getRenderedNote(@Param('id') id: number): Promise<string> {
    return await this.appService.getRenderedNote(id);
  }

  @Post('notes')
  async createNotes(
    @Body() body: CreateNoteRequest,
  ): Promise<CreateNoteResponse> {
    try {
      const sanitizedBody = CreateNoteRequestZod.parse(body);
      const note = await this.appService.createNote(sanitizedBody);
      return CreateNoteResponseZod.parse({
        message: 'Note created successfully',
        note,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Note creation failed');
    }
  }
}
