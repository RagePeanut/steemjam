import { MarkdownParserService } from './../../../markdown-parser.service';
import { PostsService } from '../../../posts.service';

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

  constructor(private postService: PostsService,
              private markdownParserService: MarkdownParserService) { }

  ngOnInit() {
    this.replyBody = this.markdownParserService.convert(this.reply.body);
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
