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
  account = {
    meta: {
      profile: {}
    }
  };
  followers = [];
  following = [];

  username: string;
  followerCount = 0;
  followingCount = 0;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService) { }

  ngOnInit() {
    const routeSnapshot = this.route.snapshot;
    this.username = routeSnapshot.params['username'].replace(/@/, '');

    this.profileService
      .getFollowCount(this.username)
      .then(
        (result) => {
          this.followerCount = result.follower_count;
          this.followingCount = result.following_count;
          console.log(result);
          this.profileService
            .getFollowers(result.account, result.follower_count)
            .then(
              (followers) => {
                this.followers = followers;
              }
            );
          this.profileService
            .getFollowing(result.account, result.following_count)
            .then(
              (following) => {
                this.following = following;
              }
            );
        }
      );

    this.profileService
      .getAccount(this.username)
      .then(
        (result) => {
          this.account = result;
          console.log(this.account);
        }
      );
  }

}
