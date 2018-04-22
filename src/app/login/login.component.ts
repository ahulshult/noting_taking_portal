import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user;
  constructor(private authService: AuthService, private router: Router) {
  }


   signInWithTwitter() {
      this.authService.googleLogin()

      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithFacebook() {
      this.authService.googleLogin()
      .then((res) => {
          this.router.navigate(['dashboard'])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.googleLogin()
      .then((res) => {
          this.user = firebase.auth().currentUser;
          this.router.navigate(['addClass', this.user.uid])
        })
      .catch((err) => console.log(err));
    }



  ngOnInit() {
  }

}
