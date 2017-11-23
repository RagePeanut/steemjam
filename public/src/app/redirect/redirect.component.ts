import { SteemConnectService } from './../steemconnect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private steemConnect: SteemConnectService,
              private router: Router) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.steemConnect.setLocalStorage(
      queryParams['access_token'],
      queryParams['expires_in'],
      queryParams['username']
    );
    console.log(new Date(Date.parse(localStorage.getItem('expireDate'))));
    this.router.navigate(['']);
  }

}
