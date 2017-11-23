import * as showdown from 'showdown';

import { Injectable } from '@angular/core';

@Injectable()
export class MarkdownParserService {

  private converter;

  constructor() {
    this.converter = new showdown.Converter(
      {
        omitExtraWLInCodeBlocks: true,
        noHeaderId: true,
        customizeHeaderId: false,
        ghCompatibleHeaderId: false,
        prefixHeaderId: false,
        rawPrefixHeaderId: false,
        rawHeaderId: false,
        parseImgDimensions: true,
        headerLevelStart: 1,
        simplifiedAutoLink: true,
        excludeTrailingPunctuationFromURLs: true,
        literalMidWordUnderscores: false,
        literalMidWordAsterisks: false,
        strikethrough: true,
        tables: true,
        tablesHeaderId: false,
        ghCodeBlocks: true,
        tasklists: true,
        smoothLivePreview: true,
        smartIndentationFix: true,
        disableForced4SpacesIndentedSublists: true,
        simpleLineBreaks: true,
        requireSpaceBeforeHeadingText: true,
        ghMentions: true,
        ghMentionsLink: '/@{u}',
        encodeEmails: true,
        openLinksInNewWindow: true,
        backslashEscapesHTMLTags: true,
        emoji: true,
        underline: false
      }
    );
  }

  private fixImageMisconversion(content: string) {
    const re = /<a href="((?:https?:\/\/)?.+\..{2,}\/.+\.(?:jpe?g|png|gif))" target="_blank">\1<\/a>/g;
    return content.replace(re, '<img src="$1">');
  }

  private fixImageMisconversionFromSpecialURL(content: string) {
    const re = /<a href="((?:https?:\/\/)?img\.[\w-]+.[a-z\d]{2,}\/[\w@./-]+(?:\?\w+=\w+(?:&\w+=\w+)?)?)" target="_blank">\1<\/a>/g;
    return content.replace(re, '<img src="$1" alt="Image unavailable at $1">');
  }

  private fixCenterInParagraph(content: string) {
    let re = /(<p>)(<br(?: *\/)?>[ \n]?)*(?=<center>)/g;
    content = content.replace(re, '$2');
    re = /(<\/center>)(<br(?: *\/)?>[ \n]?)*(<\/p>)/g;
    return content.replace(re, '$1$2');
  }

  private fixImageInCenter(content: string) {
    // tslint:disable-next-line:max-line-length
    const re = /(<center>)!\[([^\]]*?)][ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)(<\/center>)/g;
    return content.replace(re, '$1<img src="$3" alt="$2">$8');
  }

  private fixBreaks(content: string) {
    let re = /<p>(<\/?center>|<br>)<\/p>/g;
    content = content.replace(re, '$1');
    re = /<p>(?:<br(?: \/)?>\n?)+(.*)(?:<br(?: \/)?>\n?)+<\/p>/g;
    return content.replace(re, '<br>$1<br>');
  }

  private fixLinkInCenter(content: string) {
    const re = /(<center>)\[(.+)]\((.+)\)(<\/center>)/g;
    return content.replace(re, '$1<a href="$3">$2</a>$4');
  }

  /*private parseVideos(content: string) {
    /// Youtube
    // Parses videos from the following websites:
    // https://www.youtube.com/
    // https://youtu.be/
    // https://www.youtube-nocookie.com/
    let re = /<a href="((?:https?:\/\/)?(?:www\.)?youtu(?:be(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|\.be\/)(.+)(?:
    (?:&[\w=]+)+)?)" target="_blank">\1<\/a>/g;
    return content.replace(re, '<iframe width="640" height="360"
    src="https://www.youtube-nocookie.com/embed/$2?rel=0&amp;showinfo=0" frameborder="0" gesture="media" allowfullscreen></iframe>');
  }*/

  convert(markdown: string) {
    console.log('Conversion commencée');
    return this.fixLinkInCenter(
      this.fixImageInCenter(
        this.fixCenterInParagraph(
          this.fixBreaks(
            this.fixImageMisconversionFromSpecialURL(
              this.fixImageMisconversion(
                this.converter.makeHtml(
                  markdown
                )
              )
            )
          )
        )
      )
    );
  }

}
