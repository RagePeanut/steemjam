import { ProfileService } from './profile.service';
import * as steem from 'steem';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {

  account: Object = {
    meta: {
      profile: {}
    },
    reputation: 25
  };

  followers = [];
  following = [];

  followerCount = 0;
  followingCount = 0;

  username: string;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService) {

    route.params.subscribe(value => {

      this.username = this.route.snapshot.params['username'].replace(/@/, '');
      this.profileService
        .getAccount(this.username)
        .then(
          result => {
            this.account = result;
          }
        );

      this.profileService
        .getFollowCount(this.username)
        .then(
          result => {
            this.followerCount = result.follower_count;
            this.followingCount = result.following_count;
          }
        );

      this.profileService
        .setGamesByAuthor(this.username);

      this.profileService
        .setGamesLikedByAccount(this.username);

      this.profileService
        .getFollowers(this.username)
        .then(
          (result: any[]) => {
            this.followers = result;
          }
        );

      this.profileService
        .getFollowing(this.username)
        .then(
          (result: any[]) => {
            this.following = result;
          }
        );

    });

  }

  ngOnInit() {

  }

}
