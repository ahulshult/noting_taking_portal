import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user;
  constructor( public authService: AuthService, private router: Router) {
   }

   checkForLogin() {
   firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
       this.user = true;
       return true;
     } else {
       this.user = false;
       return false;
       // No user is signed in.
     }
   });
 }

  ngOnInit() {
    this.checkForLogin();
  }

}
