import * as steem from 'steem';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

  constructor() { }

  private transformPost(account) {
    account.meta = JSON.parse(account.json_metadata);

    return account;
  }

  async getFollowers(following: string, count: number) {
    let followers = [];
    let startFollower = '';
    for (let i = 0; i < count; i += 1000) {
      let tmp = await steem.api.getFollowers(following, startFollower, 'blog', 1000);
      Array.prototype.push.apply(followers, tmp);
      startFollower = followers[followers.length - 1].followers;
      if (i + 1000 < count) {
        followers.pop();
      }
    }
    return followers;
  }

  async getFollowing(follower: string, count: number) {
    let following = [];
    let startFollowing = '';
    for (let i = 0; i < count; i += 100) {
      let tmp = await steem.api.getFollowing(follower, startFollowing, 'blog', 100);
      Array.prototype.push.apply(following, tmp);
      startFollowing = following[following.length - 1].following;
      if (i + 100 < count) {
        following.pop();
      }
    }
    return following;
  }

  getFollowCount(name: string) {
    return steem.api
      .getFollowCount(name)
      .then(
        (result) => {
          return result;
        }
      );
  }

  getAccount(name: string) {
    return steem.api
      .getAccounts([name])
      .then(
        (result) => {
            result.map(this.transformPost);
            result[0].reputation = steem.formatter.reputation(result[0].reputation);
            return result[0];
        }
      );
  }


}
