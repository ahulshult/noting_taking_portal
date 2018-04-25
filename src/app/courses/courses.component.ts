import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

var myCourses;

export interface Course{
  email: string;
  first_name: string;
  classes: any[];
  uid: string;
}

export interface User{
  name: string;
  email: string;
  id: string;
}


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public users;
  public userid;
  public allCourses;
  public noClasses;
  itemCollection: AngularFirestoreCollection<Course>;
  items: Observable<Course[]>
    constructor(public af: AngularFirestore, private as: AuthService, private router: Router) {
      //this.courses = this.angularFire.doc('class/' + user.uid) ;
      //this.firebase = this.angularFire.list('/notegator');
    this.itemCollection = this.af.collection('/class');
    this.items = this.itemCollection.valueChanges();
    this.userid = this.as.userLoggedIn().uid;
    console.log(this.items);
    }

  ngOnInit() {

    //let user = firebase.auth().currentUser;
    /*console.log(this.userid);
    this.users = this.af.collection('/user').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
         return data;

        });
      });*/
      this.allCourses= this.af.collection('/user').doc(this.userid).ref.get()
      .then(function(doc){
        if(doc.exists){
          myCourses = doc.data().classes;
          console.log(myCourses);
          return doc.data()
        }
      }).catch(function(error){
        console.log(error);
      });
  }
    addClass(){
      this.router.navigate(['addClass', this.userid])
    }

    notes(coursechosen){
      console.log(coursechosen.classNumber);
    }
  /*	getTask(){
  		return this.angularFire.list('/user/${:this.user.uid}/classes').valueChanges();
  	}*/

}
