import { Inject, Injectable } from '@nestjs/common';
import { LINTER_TOKEN } from '../../utils/constants.js';
import { LocalLinter, SuggestionKind } from 'harper.js';
import { GrammarCheckType } from '../../models/grammar/base.js';

@Injectable()
export class GrammarService {
  constructor(
    @Inject(LINTER_TOKEN)
    private readonly linter: LocalLinter,
  ) {}

  async grammarCheck(text: string): Promise<GrammarCheckType[]> {
    const lints = await this.linter.lint(text);

    const results: GrammarCheckType[] = [];
    for (const lint of lints) {
      const lintSpan = lint.span();

      if (lint.suggestion_count() !== 0) {
        for (const sug of lint.suggestions()) {
          console.log(
            '\t - ',
            sug.kind() === SuggestionKind.Remove
              ? 'Remove'
              : sug.kind() === SuggestionKind.InsertAfter
                ? 'Insert after'
                : 'Replace with',
            sug.get_replacement_text(),
          );
        }
      }
      results.push({
        start: lintSpan.start,
        end: lintSpan.end,
        message: lint.message(),
        suggestions:
          lint.suggestion_count() !== 0
            ? lint.suggestions().map((sug) => ({
                replacement: sug.get_replacement_text(),
                message:
                  sug.kind() === SuggestionKind.Remove
                    ? 'Remove'
                    : 'Replace with',
              }))
            : [],
      });
    }
    return results;
  }
}
