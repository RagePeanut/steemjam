import * as marked from 'marked';

import { Injectable } from '@angular/core';

@Injectable()
export class MarkdownParserService {

  private md;

  constructor() {
    this.md = marked;
  }

  convert(markdown: string) {
    return this.md.parse(markdown);
  }

}
