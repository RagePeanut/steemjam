import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GameService {

  aboutPartEmitter = new EventEmitter<string>();
  aboutPart: string;
  controlsPartEmitter = new EventEmitter<string>();
  controlsPart: string;

  galleryEmitter = new EventEmitter<string[]>();
  gallery: string[];

  constructor() { }

  private deleteImage(content: string) {
    const re = /\s*!\[(.*)]\((.*)\)\s*/gi;
    return content.replace(re, '\n');
  }

  private parseGame(content: string) {
    return this.parseNewLine(
      this.parseLinkNoMarkdown(
        this.parseLink(
          this.parseItalic(
            this.parseBold(
              this.parseStrike(
                this.parseDividingLine(
                  this.parseTitles(
                    this.deleteImage(content)
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  private parseContent(content: string) {
    return this.parseLink(
      this.parseImage(
        this.parseNewLine(
          this.parseItalic(
            this.parseBold(
              this.parseDividingLine(
                this.parseTitles(
                  this.parseTable(content)
                )
              )
            )
          )
        )
      )
    );
  }

  private parseTitles(content: string) {
    return this.parseH1(
      this.parseH2(
        this.parseH3(
          this.parseH4(
            this.parseH5(
              this.parseH6(content)
            )
          )
        )
      )
    );
  }

  private parseNewLine(content: string) {
    const re = /\n/g;
    const re2 = /(<\/center>)|(<\/div>)(<br>)+/g;
    return this.parseMultipleNewLine(content)
      .replace(re, '<br>')
      .replace(re2, '$1$2<br>');
  }

  private parseMultipleNewLine(content: string) {
    const re = /(\n\s*){2,}/g;
    return content.replace(re, '<br><br>');
  }

  private parseBold(content: string) {
    const re = /(\*{2}([^\s][^*\n]+[^\s])\*{2})|(_{2}([^\s][^_\n]+[^\s])_{2})/gi;
    return content.replace(re, '<b>$2$4</b>').replace(re, '<b>$2$4</b>');
  }

  private parseItalic(content: string) {
    const re = /(\*([^\s][^*\n]+[^\s])\*)|(_([^\s][^_\n]+[^\s])_)/gi;
    return content.replace(re, '<em>$2$4</em>').replace(re, '<em>$2$4</em>');
  }

  private parseStrike(content: string) {
    const re = /~~([^\s].*[^\s])~~/gi;
    return content.replace(re, '<del>$1</del>');
  }

  private parseImage(content: string) {
    const re = /!\[(.*)]\((.*)\)/gi;
    return content.replace(re, '<img src="$2" alt="$1">');
  }

  private parseLink(content: string) {
    const re = /\[(.*)]\((.*)\)/gi;
    return content.replace(re, '<a href="$2">$1</a>');
  }

  private parseLinkNoMarkdown(content: string) {
    const re = /(^|[^">])(https?:\/\/[^\s]+\.[a-z0-9]{2,}\/?)/g;
    return content.replace(re, '$1<a href="$2">$2</a>');
  }

  private parseTable(content: string) {
    return this.parseTableBody(this.parseTableHead(content));
  }

  private parseTableHead(content: string) {
    const re = /Action\|Keyboard\|Gamepad\w*\n-\|-\|-\n((([A-Za-z0-9 -]*)\|(.*)\|(.*)\n)*)/gi;
    return content.replace(re,
      '<table><thead><tr><th>Action</th><th>Keyboard</th><th>Gamepad</th></tr></thead><tbody>$1</tbody></table>');
  }

  private parseTableBody(content: string) {
    const re = /([A-Za-z0-9 -]*)\|(.*)\|(.*)/gi;
    return content.replace(re,
      '<tr><td>$1</td><td>$2</td><td>$3</td></tr>');
  }

  private parseInlineCode(content: string) {
    const re = /`(.*)`/gi;
    return content.replace(re, '<code>$1</code>');
  }

  private parseQuote(content: string) {
    const re = />(.*)/gi;
    return content.replace(re, '<blockquote>$1</blockquote>');
  }

  private parseDividingLine(content: string) {
    const re = /\n_{3,}|\*{3,}|-{3,}\n/g;
    return content.replace(re, '<hr>');
  }

  private parseH6(content: string) {
    const re = /#{6,} +(.*)/gi;
    return content.replace(re, '<h6>$1</h6>');
  }

  private parseH5(content: string) {
    const re = /#{5} +(.*)/gi;
    return content.replace(re, '<h5>$1</h5>');
  }

  private parseH4(content: string) {
    const re = /#{4} +(.*)/gi;
    return content.replace(re, '<h4>$1</h4>');
  }

  private parseH3(content: string) {
    const re = /#{3} +(.*)/gi;
    return content.replace(re, '<h3>$1</h3>');
  }

  private parseH2(content: string) {
    const re = /((.*)\n-+)|(#{2} +(.*))/gi;
    return content.replace(re, '<h2>$2$4</h2>');
  }

  private parseH1(content: string) {
    const re = /((.*)\n=+)|(# +(.*))/gi;
    return content.replace(re, '<h1>$2$4</h1>');
  }

  setPart(part: string, body: string) {
    let re;
    if (part === 'about') {
      re = /\[]\(about-start\)\s*((.|\s)*)\[]\(about-end\)/i;
      this.aboutPart = this.parseGame(body.match(re)[1]);
      this.aboutPartEmitter.emit(this.aboutPart);
    } else if (part === 'controls') {
      re = /\[]\(controls-start\)\s*((.|\s)*)\[]\(controls-end\)/i;
      this.controlsPart = this.parseTable(body.match(re)[1]);
      this.controlsPartEmitter.emit(this.controlsPart);
    }
  }

  setGallery(gallery: string[]) {
    this.gallery = gallery;
    this.galleryEmitter.emit(this.gallery);
  }

}
