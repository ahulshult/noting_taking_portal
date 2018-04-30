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
import { ActivatedRoute } from '@angular/router';

var noNotes;
var id;
var myNotes = [];
export interface Notes{
  uid: string;
  classNumber: string;
  date_uploaded: string;
  day_for: string;
  path:string;
}


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})


export class NotesComponent implements OnInit {
  public users;
  public userid;
  public allnotes;
  public noClasses;
  public allClasses;
  public showNote;
  public src;
 itemCollection: AngularFirestoreCollection<Notes>;
  items: Observable<Notes[]>

  constructor(public af: AngularFirestore, private as: AuthService, private router: Router, private route: ActivatedRoute) {
  //  this.itemCollection = this.af.collection('/class');
  //  this.items = this.itemCollection.valueChanges();
  this.itemCollection = this.af.collection('/class');
  this.items = this.itemCollection.valueChanges();
    this.userid = this.as.userLoggedIn().uid;
    id = this.route.snapshot.paramMap.get('id');
  //  noNotes = true;
  //  showNote = false;
    this.src='';
    console.log(noNotes);
}

  ngOnInit() {
    this.allnotes= this.af.collection('/user').doc(this.userid).ref.get()
    .then(function(doc){
      if(doc.exists){
      //  noNotes = false;
        myNotes = doc.data().notes;
        console.log(myNotes);
        return doc.data()
      }

    }).catch(function(error){
      console.log(error);
    });
    this.allClasses= this.af.collection('/user').doc(this.userid).ref.get()
    .then(function(doc){
      if(doc.exists){
        //noNotes = false;
        var myClasses = doc.data().classes;
        console.log(myClasses);
        return doc.data()
      }

    }).catch(function(error){
      console.log(error);
    });
  }

  showNotes(num, uid){
    console.log(id);
    if(id == num){
      return true;
    }
    else{
      return false;
  }
}
  getNotes(path){
    this.router.navigate(['dashboard']);
    //this.src = path.getDownloadURL();
  //  showNote = true;

  }
}
