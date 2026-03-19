import {
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  GetNotesResponse,
  GetNotesResponseZod,
} from './models/notes/responses';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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
}
