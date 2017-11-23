import * as steem from 'steem';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {

  constructor() { }

  getReplies(post) {
    return steem.api
      .getContentReplies(post.author, post.permlink)
      .then(
        (result) => {
          return result;
        }
      );
  }

}
