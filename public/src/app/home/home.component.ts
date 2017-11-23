import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';

import * as steem from 'steem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService
      .getPosts()
      .then(
        (result) => {
          this.posts = result;
        }
      );
  }

}
