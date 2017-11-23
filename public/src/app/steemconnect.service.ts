import { PostsService } from './posts.service';
import { Injectable } from '@angular/core';
import * as sc2 from 'sc2-sdk';
import * as steem from 'steem';
import * as removeAccents from 'remove-accents';

@Injectable()
export class SteemConnectService {

  account = {
    name: '',
    user_metadata: {
      steemjam: {}
    }
  };

  username: string;
  expireDate: Date;

  constructor(private postsService: PostsService) { }

  initialize(app: string, callbackURL: string, scope: string[]) {
    sc2.init({
      app: app,
      callbackURL: callbackURL,
      scope: scope
    });
  }

  getLoginURL(state?: string[]) {
    return sc2.getLoginURL();
  }

  setAccountDetails() {
    sc2.me()
      .then(
        (result) => {
          this.account = result;
          console.log(result);
        }
      );
  }

  setAccessToken(accessToken: string) {
    sc2.setAccessToken(accessToken);
  }

  setLocalStorage(accessToken: string, expiresIn: number, username: string) {
    this.setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
    this.username = username;
    localStorage.setItem('username', username);
    this.expireDate = new Date();
    this.expireDate.setSeconds(expiresIn);
    localStorage.setItem('expireDate', this.expireDate.toDateString());
  }

  vote(author: string, permlink: string, weight: number) {
    return sc2
      .vote(this.account.name, author, permlink, weight)
      .then(result => result);
  }

  comment(parentAuthor: string, parentPermlink: string, permlink: string, title: string, body: string, jsonMetadata) {
    sc2.comment(parentAuthor, parentPermlink, this.account.name, permlink, title, body, jsonMetadata)
      .then(
        (result) => {
          console.log(result);
        }
      );
  }

  updateUser(account: string) {
    if (!this.account.user_metadata.steemjam) {
      this.account.user_metadata.steemjam = {
        achievements: [],
        games: [],
        liked: []
      };
    }
    sc2.updateUserMetadata(this.account.user_metadata)
      .then(
        (res) => {
          console.log(res);
        }
      );
  }

  post(title: string,
       videos: {youtube: string, dtube: string},
       creators: string[],
       theme: {name: string, hashtag: string},
       download: string,
       about: string,
       gallery: string[],
       controls: {action: string, keyboard: string, gamepad: string}[],
       genres: string[]) {

    // Creating the tags array, has to be maximum 5 tags
    const tags = [theme.hashtag, 'gamingtest'];
    for (let i = 0; i < 3; i++) {
      tags.push(genres[i]);
    }

    // Creating the permlink
    const permlink = removeAccents(title).replace(/[^\w-]+/g, '-').toLowerCase() + '-';

    // Creating the comment object passed through the operations
    const comment = {
      'parent_author': '',
      'parent_permlink': theme.hashtag,
      'author': this.account.name,
      'permlink': permlink,
      'title': title,
      'body': this.postsService.createBody(title, videos, creators, theme, download, about, gallery, controls),
      'json_metadata': JSON.stringify({
        'about': about,
        'app': 'steemjamtest',
        'controls': controls,
        'download': download,
        'genres': genres,
        'image': gallery,
        'links': [],
        'format': 'markdown',
        'tags': tags,
        'theme': theme,
        'users': creators
      })
    };

    const beneficiaries = [];
    const weight = 10000 / creators.length;
    for (let i = 0; i < creators.length; i++) {
      beneficiaries[i] = { 'account': creators[i], 'weight': weight };
    }

    // Creating the comment options object passed through the operations
    const commentOptions = {
      'author': this.account.name,
      'permlink': permlink,
      'max_accepted_payout': '1000000.000 SBD',
      'percent_steem_dollars': 10000,
      'allow_votes': true,
      'allow_curation_rewards': true,
      'extensions': [
        [
          0,
          {
            'beneficiaries': beneficiaries
          }
        ]
      ]
    };

    console.log(comment);
    console.log(commentOptions);

    sc2.broadcast([['comment', comment], ['comment_options', commentOptions]])
      .then(
        (result) => {
          console.log(result);
        }
      );

  }

  logout() {
    localStorage.clear();
    return sc2.revokeToken()
      .then(
        (result) => {
          return result;
        }
      );
  }

}
