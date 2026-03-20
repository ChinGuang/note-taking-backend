import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { GrammarService } from './grammar.service.js';
import { GrammarCheckRequest } from '../../models/grammar/requests.js';
import { GrammarCheckResponse } from '../../models/grammar/responses.js';

@Controller()
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Post('grammar-check')
  async grammarCheck(
    @Body() body: GrammarCheckRequest,
  ): Promise<GrammarCheckResponse> {
    try {
      const result = await this.grammarService.grammarCheck(body.text);
      return {
        message: 'Grammar check completed',
        hasError: result.length > 0,
        details: result,
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
