import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import {User} from '../models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model = new User('', false, '', '', [], []);
  private user;
  private userid;
  public showLogin;
  public showSignup;
  public showInputAlert;
  public email;
  public password;
  constructor(private authService: AuthService, private router: Router, public af: AngularFirestore,) {
          this.model.isNotetaker = true;
          this.model.first_name = "";
          this.model.last_name = "";
          this.showLogin=false;
          this.showSignup=true;
          this.showInputAlert=false;
          console.log(this.model);
  }
    resetAlert(){
      this.showInputAlert=false;
      console.log("resetAlert" + this.model);
    }
    nextLogin(){
      console.log("nextLogin" + this.model);
      if(this.model.first_name != "" && this.model.last_name != ""){
        this.showSignup=false;
        this.showLogin=true;
      }
      else{
        this.showInputAlert=true;
      }
    }

    signInWithFacebook() {
      this.authService.firstfacebookLogin(this.model)
      .then((res) => {
        this.user = firebase.auth().currentUser;
          this.router.navigate(['homepage', this.user.uid])
        })
      .catch((err) => console.log(err));
    }


    signInWithGoogle() {
      this.authService.firstgoogleLogin(this.model)
      .then((res) => {
          this.user = firebase.auth().currentUser;
          this.router.navigate(['addClass', this.user.uid])
        })
      .catch((err) => console.log(err));
    }

    signInWithEmail() {
      console.log(this.email);
      this.authService.firstsignInRegular(this.email, this.password, this.model);

}
  ngOnInit() {

  }

}
