import { SteemSQLService } from './../steemsql.service';
import * as steem from 'steem';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

  madeGames = [];
  likedGames = [];

  constructor(private steemSQLService: SteemSQLService) { }

  private parse(json_metadata: string) {
    return JSON.parse(json_metadata);
  }

  getAccount(username: string) {

    return this.steemSQLService
      .getAccount(username)
      .then(
        (result: Object) => {
          result['meta'] = this.parse(this.parse(result['json_metadata']));
          result['reputation'] = steem.formatter.reputation(result['reputation']);
          return result;
        }
      );

  }

  getFollowCount(account: string) {

    return steem.api
      .getFollowCount(account)
      .then(
        (result: any) => {
          return result;
        }
      );

  }

  getFollowers(following: string) {

    return this.steemSQLService
      .getFollowers(following)
      .then(
        (result: Object) => {
          return result;
        }
      );

  }

  getFollowing(follower: string) {

    return this.steemSQLService
      .getFollowing(follower)
      .then(
        (result: Object) => {
          return result;
        }
      );

  }

  setGamesByAuthor(author: string) {

    this.steemSQLService
      .getGamesByAuthor(author)
      .then(
        (result: any[]) => {
          result.forEach(game => {
            game.beneficiaries = this.parse(game.beneficiaries);
            game.meta = this.parse(game.json_metadata);
          });
          this.madeGames = result;
          console.log(result);
        }
      );

  }

  setGamesLikedByAccount(account: string) {

    this.steemSQLService
      .getGamesLikedByAccount(account)
      .then(
        (result: any[]) => {
          result.forEach(game => {
            game.beneficiaries = this.parse(game.beneficiaries);
            game.meta = this.parse(game.json_metadata);
          });
          this.likedGames = result;
          console.log(result);
        }
      );

  }

}
