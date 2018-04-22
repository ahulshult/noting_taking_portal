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


export interface Course{
  email: string;
  first_name: string;
  classes: any[];
  uid: string;
}
export interface CourseId extends Course { id: string; }

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  public userid;
  itemCollection: AngularFirestoreCollection<Course>;
  items: Observable<Course[]>
  	constructor(public af: AngularFirestore, private as: AuthService) {
  		//this.courses = this.angularFire.doc('class/' + user.uid) ;
  		//this.firebase = this.angularFire.list('/notegator');

    this.itemCollection = this.af.collection('/user');
    this.items = this.itemCollection.valueChanges();
    this.userid = this.as.userLoggedIn().uid;

    /*this.af.doc('user/' + user.uid).get().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        console.log('doc' + doc.id);

      })
    })*//*
    this.items = this.itemCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });*/

  	}

	ngOnInit() {
    //let user = firebase.auth().currentUser;
    console.log(this.userid);
	}

//	addCourse() {
    //this.user = this.angularfire2.auth().currentUser;
  /*  this.angularFire.collection('class').add(Class)
    .then(function(docRef){
      console.log('success');
    }).catch(function(error){
      console.log(error);
    })
  }
   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`class/${course.uid}`);

   const data: User = {
     uid: user.uid,
     email: user.email,
   }
 */
}
