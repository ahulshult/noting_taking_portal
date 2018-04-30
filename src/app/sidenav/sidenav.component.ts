import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  private user;
  public userid;
  constructor(private authService: AuthService, public router: Router) {
    this.userid = this.authService.userLoggedIn().uid;
   }
  ngOnInit() {

  }

  notesPage(){
    this.router.navigate(['notes', this.userid])
  }

  coursesPage(){
    this.router.navigate(['courses', this.userid])
  }

  notificationsPage(){
    this.router.navigate(['notifications', this.userid])
  }

}
