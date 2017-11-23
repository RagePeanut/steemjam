import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SteemSQLService {

  constructor(private http: HttpClient) { }

  private getGames() {

    return this.http
      .get('/api/get_games/')
      .toPromise();

  }

  getAccount(username: string) {

    return this.http
      .get('/api/get_account/?username=' + username)
      .toPromise();

  }

  getComments(parentPermlink: string) {

    this.http
      .get('/api/get_comments/?parent_permlink=' + parentPermlink)
      .subscribe(
        data => {
          return data;
        },
        error => {
          console.log(error);
          return {};
        }
      );

  }

  getFollowers(following: string) {

    return this.http
      .get('/api/get_followers/?following=' + following)
      .toPromise();

  }

  getFollowing(follower: string) {

    return this.http
      .get('/api/get_following/?follower=' + follower)
      .toPromise();

  }

  getGame(permlink: string) {

    return this.http
      .get('/api/get_game/?permlink=' + permlink)
      .toPromise();

  }

  getGamesByAuthor(author: string) {

    if (author === '') {

      return this.getGames();

    }

    return this.http
      .get('/api/get_games/?author=' + author)
      .toPromise();

  }

  getGamesByTitle(title: string) {

    if (title === '') {

      return this.getGames();

    }

    return this.http
      .get('/api/get_games/?title=' + title)
      .toPromise();

  }

  getGamesLikedByAccount(account: string) {

    return this.http
      .get('/api/get_games_liked/?account=' + account)
      .toPromise();

  }

}
