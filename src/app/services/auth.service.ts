import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'
import {User} from '../models/user.model';


@Injectable()
export class AuthService {
  model = new User('', false, '', '', [], []);
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            console.log(this.userDetails);
          }
          else {
            this.userDetails = null;
          }
        }
      );

  }



  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  facebookLogin(){
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.oAuthLogin(provider);
  }

  firstgoogleLogin(userInfo){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.firstoAuthLogin(provider, userInfo);
  }

  firstfacebookLogin(userInfo){
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.firstoAuthLogin(provider, userInfo);
  }

  firstsignInRegular(email, password, userInfo) {
    console.log(email + password + userInfo);
      var credentials = this.afAuth.auth.createUserWithEmailAndPassword(email, password );
      console.log(credentials);
      return true;
      //  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    }
    signInRegular(email, password) {
      console.log(email + password);
        return this.afAuth.auth.signInWithEmailAndPassword(email, password );
        
        //  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      }


  private firstoAuthLogin(provider, userInfo) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user, userInfo)
      })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.user = credential.user
      })
  }


  private updateUserData(credential, userInfo) {
    // Sets user data to firestore on login
    //console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${credential.uid}`);


    return userRef.set({
      uid: credential.uid,
      classes: [],
      isNotetaker: userInfo.isNotetaker,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      notes: []
    })

  }

  isLoggedIn() {
  if (this.userDetails == null ) {
      return false;
    } else {
      return true;
    }
  }
  userLoggedIn(){
    if(this.userDetails == null){
      return null;
    } else{
      return this.userDetails;
    }
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
