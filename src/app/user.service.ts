import { User } from './user.model';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private user: User;

  constructor() { }

  getUser() {
    return new User(
      this.user.can_vote,
      this.user.id,
      this.user.json_metadata,
      this.user.name,
      this.user.voting_power
    );
  }

  setUser(user: User) {
    this.user = user;
  }

  // getVotingAbility() {
  //   return this.user.can_vote;
  // }

  // getId() {
  //   return this.user.id;
  // }

  // getJsonMetadata() {
  //   return this.user.json_metadata;
  // }

  // getName() {
  //   return this.user.name;
  // }

  // getVotingPower() {
  //   return this.user.voting_power;
  // }


}
