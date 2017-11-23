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

  getReplies(post) {
    return steem.api
      .getContentReplies(post.author, post.permlink)
      .then(
        (result) => {
          return result;
        }
      );
  }

  createBody(title: string,
             videos: {youtube: string, dtube: string},
             creators: string[],
             theme: {name: string, hashtag: string},
             download: string,
             about: string,
             gallery: string[],
             controls: {action: string, keyboard: string, gamepad: string}[]) {

    // Creating the videos string that gets outputted at the top of the post
    let videosString = '';
    if (videos.dtube !== '') {
      videosString += '[!['
                    + title + ']('
                    + gallery[0] + ')](https://d.tube/#!/v/'
                    + videos.dtube + ')</center>\n\n<center>Click on the image to watch the video on **DTube**';
      if (videos.youtube !== '') {
        videosString += ' or **[click here](https://www.youtube.com/watch?v='
                      + videos.youtube + ')** to watch it on **YouTube**';
      }
      videosString += '.';
    } else if (videos.youtube !== '') {
      videosString += 'https://www.youtube.com/watch?v='
                    + videos.youtube + '</center>\n\n<center>Click above to watch the video on **YouTube**.';
    } else {
      videosString += '!['
                    + title + ']('
                    + gallery[0] + ')';
    }
    // Creating the creators string that gets outputted in the upper table
    let creatorsString = '@' + creators[0];
    for (let i = 1; i < creators.length; i++) {
      creatorsString += ', @' + creators[i];
    }

    // Creating the controls section of the post
    let controlsString = '';
    for (let i = 0; i < controls.length; i++) {
      controlsString += controls[i].action + ' | ' + controls[i].keyboard + ' | ' + controls[i].gamepad + '\n';
    }

    // Creating the gallery section of the post
    let galleryString = '';
    for (let i = 1; i < gallery.length; i++) {
      galleryString += '![Image ' + i + '](' + gallery[i] + ')\n';
    }

    const body = '<center>'
                + videosString + '</center>\nCreators | '
                + creatorsString + '\n-|-\nTheme | ['
                + theme.name + '](/created/'
                + theme.hashtag + ')\nDownload | '
                + download + '\n<br>'
                + about + '\n<br>\n___\n# <center>Controls</center><br>\nAction | Keyboard | Gamepad\n-|-|-\n'
                + controlsString + '<br>\n___\n# <center>Gallery</center>\n<center>'
                // tslint:disable-next-line:max-line-length
                + galleryString + '</center><br>\n___\n<div class="text-justify"><strong>Steem Jam</strong> is a contest that rewards game creators for making games in a short period. Each edition has a specific theme decided by the public. Games submitted then get upvoted by the users, creators win a part of the money raised relative to the percentage of total votes they have on their game.</div>\n\n<center>**To learn more about this contest, read [this post](/programming/@ragepeanut/project-steem-jam-1-or-what-is-the-steem-jam).**</center>';
    return body;
  }

}
