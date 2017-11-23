import { MarkdownParserService } from './../../../markdown-parser.service';
import { PostService } from './../post.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply;
  hasChildren = false;
  replyBody: string;

  constructor(private postService: PostService,
              private markdownParserService: MarkdownParserService) { }

  ngOnInit() {
    const re = /(?:^|[^\/])(@[a-z][a-z0-9-.]{1,14}[a-z0-9])/g;
    this.replyBody = this.markdownParserService
                         .convert(' ' + this.reply.body)
                         .replace(re, ' <a href="/$1">$1</a>');
    if (this.reply.children > 0) {
      this.hasChildren = true;
      this.postService
        .getReplies(this.reply)
        .then(
          (result) => {
            this.reply.replies = result;
          }
        );
    }
  }

}
