import { SteemConnectService } from './steemconnect.service';
import { Component, OnInit } from '@angular/core';
import * as steem from 'steem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  triggerClicked = false;
  loginURL: string;
  isLoggedIn = false;

  constructor(private steemConnect: SteemConnectService) { }

  ngOnInit() {

    steem.api.setWebSocket('wss://steemd.steemit.com');

    this.steemConnect.initialize(
      'steemjam.app',
      'http://localhost:4200/redirect',
      ['comment', 'comment_options', 'vote', 'custom_json']
    );

    this.loginURL = this.steemConnect.getLoginURL();

    if (localStorage.getItem('accessToken')) {
      this.steemConnect.setAccessToken(localStorage.getItem('accessToken'));
      this.isLoggedIn = true;
      this.steemConnect.setAccountDetails();
    }

  }

  onTriggerClicked() {
    this.triggerClicked = !this.triggerClicked;
  }

  onLoggedOut() {
    this.steemConnect.logout()
      .then(this.isLoggedIn = false);
  }

  post() {
    this.steemConnect.post(
      'Cuphead',
      { youtube: '', dtube: ''},
      ['nuttinghere', 'ragepineapple'],
      { name: 'Old-School / Charismatic characters', hashtag: 'steemjamtest' },
      'https://nuttinghere.itch.io/thisurlistotallyrandom',
      // tslint:disable-next-line:max-line-length
      'Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem sed ad lenitatem propensior, consulens in commune advocatos palatinarum primos scholarum adlocutus est mollius docens nec decere haec fieri nec prodesse addensque vocis obiurgatorio sonu quod si id placeret, post statuas Constantii deiectas super adimenda vita praefecto conveniet securius cogitari.\n\nUnde Rufinus ea tempestate praefectus praetorio ad discrimen trusus est ultimum. ire enim ipse compellebatur ad militem, quem exagitabat inopia simul et feritas, et alioqui coalito more in ordinarias dignitates asperum semper et saevum, ut satisfaceret atque monstraret, quam ob causam annonae convectio sit impedita.\n\nEquitis Romani autem esse filium criminis loco poni ab accusatoribus neque his iudicantibus oportuit neque defendentibus nobis. Nam quod de pietate dixistis, est quidem ista nostra existimatio, sed iudicium certe parentis; quid nos opinemur, audietis ex iuratis; quid parentes sentiant, lacrimae matris incredibilisque maeror, squalor patris et haec praesens maestitia, quam cernitis, luctusque declarat.\n\nEt prima post Osdroenam quam, ut dictum est, ab hac descriptione discrevimus, Commagena, nunc Euphratensis, clementer adsurgit, Hierapoli, vetere Nino et Samosata civitatibus amplis inlustris.\n\nPost emensos insuperabilis expeditionis eventus languentibus partium animis, quas periculorum varietas fregerat et laborum, nondum tubarum cessante clangore vel milite locato per stationes hibernas, fortunae saevientis procellae tempestates alias rebus infudere communibus per multa illa et dira facinora Caesaris Galli, qui ex squalore imo miseriarum in aetatis adultae primitiis ad principale culmen insperato saltu provectus ultra terminos potestatis delatae procurrens asperitate nimia cuncta foedabat. propinquitate enim regiae stirpis gentilitateque etiam tum Constantini nominis efferebatur in fastus, si plus valuisset, ausurus hostilia in auctorem suae felicitatis, ut videbatur.',
      ['https://steemitdevimages.com/0x0/https://i.ytimg.com/vi/e5iGwE0XJ1s/maxresdefault.jpg','https://steemitdevimages.com/0x0/http://cdn.akamai.steamstatic.com/steam/apps/268910/ss_615455299355eaf552c638c7ea5b24a8b46e02dd.600x338.jpg','https://steemitdevimages.com/0x0/http://cdn.akamai.steamstatic.com/steam/apps/268910/ss_483fb089be0093beeef03525276803a9ca4f66a1.600x338.jpg','https://steemitdevimages.com/0x0/http://cdn.akamai.steamstatic.com/steam/apps/268910/ss_48477e4a865827aa0be6a44f00944d8d2a3e5eb9.600x338.jpg','https://steemitdevimages.com/0x0/http://cdn.akamai.steamstatic.com/steam/apps/268910/ss_380296effbf1073bbedfd480e50cf246eb542b66.600x338.jpg','https://steemitdevimages.com/0x0/http://cdn.akamai.steamstatic.com/steam/apps/268910/ss_aefad3850c3bc04000cbe0d620bea6807e0a0331.600x338.jpg'],
      [
        {action: 'Left', keyboard: 'Q', gamepad: 'Joystick Left'},
        {action: 'Right', keyboard: 'D', gamepad: 'Joystick Right'},
        {action: 'Jump', keyboard: 'Space', gamepad: 'A'},
        {action: 'Shoot', keyboard: 'Shift', gamepad: 'R2'}
      ],
      [
        'genre1', 'genre2', 'genre3', 'genre4', 'genre5'
      ]
    );
  }

}
