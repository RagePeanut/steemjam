import * as steem from 'steem';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {

  constructor() { }

  private transformPost(post) {
    post.meta = JSON.parse(post.json_metadata);

    return post;
  }

  getPost(author: string, permlink: string) {
    return steem.api
      .getContent(author, permlink)
      .then(
        (result) => {
          result = this.transformPost(result);
          return result;
        }
      );
  }

  getPosts() {
    return steem.api
      .getDiscussionsByBlog(
        {
          tag: 'ragepeanut',
          limit: 10
        })
      .then(
        (result) => {
          result.map(this.transformPost);
          return result;
        }
      );
  }

}
