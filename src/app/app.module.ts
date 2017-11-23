import { FollowingComponent } from './profile/following/following.component';
import { FollowersComponent } from './profile/followers/followers.component';
import { GameService } from './game/game.service';
import { MarkdownParserService } from './markdown-parser.service';
import { PostService } from './home/post/post.service';
import { PostsService } from './home/posts.service';
import { HomeComponent } from './home/home.component';
import { UserService } from './user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { GameComponent } from './game/game.component';
import { GamesComponent } from './profile/games/games.component';
import { LikedComponent } from './profile/liked/liked.component';
import { CommentsComponent } from './profile/comments/comments.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { AboutComponent } from './game/about/about.component';
import { GalleryComponent } from './game/gallery/gallery.component';
import { ControlsComponent } from './game/controls/controls.component';
import { PostComponent } from './home/post/post.component';
import { ReplyComponent } from './home/post/reply/reply.component';

const appRoutes: Routes = [
  { path: ':genre/:username/:game', component: GameComponent, children: [
    { path: 'gallery', component: GalleryComponent },
    { path: 'controls', component: ControlsComponent },
    { path: 'comments', component: CommentsComponent },
    { path: '', component: AboutComponent },
    { path: '**', redirectTo: '' }
  ] },
  { path: ':username/feed', component: FeedComponent },
  { path: ':username', component: ProfileComponent, children: [
    { path: 'liked', component: LikedComponent },
    { path: 'comments', component: CommentsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'followers', component: FollowersComponent },
    { path: 'following', component: FollowingComponent },
    { path: '', component: GamesComponent },
    { path: '**', redirectTo: '' }
  ] },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    GameComponent,
    GamesComponent,
    LikedComponent,
    CommentsComponent,
    SettingsComponent,
    FeedComponent,
    AboutComponent,
    GalleryComponent,
    ControlsComponent,
    HomeComponent,
    PostComponent,
    ReplyComponent,
    FollowersComponent,
    FollowingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    PostsService,
    PostService,
    MarkdownParserService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
