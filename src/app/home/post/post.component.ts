import { MarkdownParserService } from './../../markdown-parser.service';
import { PostService } from './post.service';
import * as steem from 'steem';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post;
  postBody: string;

  isExpanded = false;
  isCommentsTriggered = false;

  constructor(private postService: PostService,
              private markdownParserService: MarkdownParserService) { }

  ngOnInit() {
    const re = /(^|\s)(@[a-z][a-z0-9-.]{1,14}[a-z0-9])/g;
    this.postBody = this.markdownParserService
                         .convert(this.post.body)
                         .replace(re, ' <a href="/$2">$2</a>');
    this.postService
      .getReplies(this.post)
      .then(
        (result) => {
          this.post.replies = result;
        }
      );
  }

  onExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onCommentsTriggered() {
    this.isCommentsTriggered = !this.isCommentsTriggered;
  }

}
