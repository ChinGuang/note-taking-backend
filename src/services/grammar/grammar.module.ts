import { Module } from '@nestjs/common';
import { LINTER_TOKEN } from '../../utils/constants.js';
import { GrammarService } from './grammar.service.js';
import { GrammarController } from './grammar.controller.js';

@Module({
  providers: [
    {
      provide: LINTER_TOKEN,
      useFactory: async () => {
        const harper = await import('harper.js');
        return new harper.LocalLinter({
          binary: harper.binaryInlined,
          dialect: harper.Dialect.American,
        });
      },
    },
    GrammarService,
  ],
  controllers: [GrammarController],
  exports: [GrammarService],
})
export class GrammarModule {}
