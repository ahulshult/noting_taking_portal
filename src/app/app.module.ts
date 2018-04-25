import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { CommonModule } from "@angular/common";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RootComponent } from './root/root.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import {RouterModule, Routes} from "@angular/router";
import { HomePageComponent } from './home-page/home-page.component';
import {HomeComponent} from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import * as firebase from 'firebase/app';
import { AppRoutes } from './app.routes';
import { AuthService } from './services/auth.service';
import { AuthGuard } from 'app/services/auth-guard.service';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { CoursesComponent } from './courses/courses.component';
import { NotesComponent } from './notes/notes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import {AngularFireStorageModule} from 'angularfire2/storage';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'addClass/:id',
  canActivate: [ AuthGuard ],
   component: AddTaskComponent},
   { path: 'addNotes/:id',
   canActivate: [ AuthGuard ],
    component: AddNotesComponent},
  {
    path: 'homepage/:id',
    canActivate: [ AuthGuard ],
    component: HomePageComponent
  },
  {
    path: 'courses/:id', component: CoursesComponent, canActivate: [ AuthGuard ],
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: '**',
    component: NoPageFoundComponent
  }
];

@NgModule({

  declarations: [
    RootComponent,
    AddTaskComponent,
    ListTaskComponent,
    HeaderComponent,
    SignupComponent,
    MembersComponent,
    HomePageComponent,
    SidenavComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    NoPageFoundComponent,
    CoursesComponent,
    NotesComponent,
    NotificationsComponent,
    AddNotesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [RootComponent]
})
export class AppModule { }
