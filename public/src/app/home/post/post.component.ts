import { MarkdownParserService } from './../../markdown-parser.service';
import { PostsService } from '../../posts.service';
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

  constructor(private postsService: PostsService,
              private markdownParserService: MarkdownParserService) { }

  ngOnInit() {
    this.postBody = this.markdownParserService.convert(this.post.body);
    this.postsService
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
