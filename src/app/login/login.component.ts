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
  public email;
  public password;
  private user;
  constructor(private authService: AuthService, private router: Router) {
  }

  signInWithEmail() {
    console.log(this.email);
    this.authService.signInRegular(this.email, this.password)
    .then((res)=>{
      this.user = firebase.auth().currentUser;
      console.log(this.user);
      this.router.navigate(['homepage', this.user.id])
    }).catch((err) => console.log(err));

  }

    signInWithFacebook() {
      this.authService.facebookLogin()
      .then((res) => {
        this.user = firebase.auth().currentUser;
          this.router.navigate(['homepage', this.user.uid])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.googleLogin()
      .then((res) => {
          this.user = firebase.auth().currentUser;
          this.router.navigate(['addNotes', this.user.uid])
        })
      .catch((err) => console.log(err));
    }



  ngOnInit() {
  }

}
