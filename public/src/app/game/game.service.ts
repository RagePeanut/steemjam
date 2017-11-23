import { SteemSQLService } from './../steemsql.service';
import { MarkdownParserService } from './../markdown-parser.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GameService {

  game = {
    active_votes: [],
    beneficiaries: [],
    meta: {
      about: '',
      download: '',
      genres: [],
      users: [],
      theme: {}
    },
    net_votes: 0,
    url: ''
  };

  constructor(private steemSQLService: SteemSQLService,
              private markdownParserService: MarkdownParserService) {}

  private parse(json_metadata: string) {
    return JSON.parse(json_metadata);
  }

  private convertToHTML(text: string) {
    return this.markdownParserService.convert(text);
  }

  setGame(permlink: string) {
    return this.steemSQLService
      .getGame(permlink)
      .then(
        (result: any) => {
          result.meta = this.parse(result.json_metadata);
          result.beneficiaries = this.parse(result.beneficiaries);
          result.active_votes = this.parse(result.active_votes);
          this.game = result;
          this.game.meta.about = this.convertToHTML(this.game.meta.about);
          console.log(this.game);
        }
      );
  }

}
