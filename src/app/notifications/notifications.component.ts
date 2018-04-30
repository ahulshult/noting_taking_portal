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
import { Message } from '../models/messages.model'
var noNotes;
var id;
var myNotes = [];
export interface Messages{
  uid: string;
  text: string;
  time: string;
  name: string;
  path:string;
}


@Component({
  selector: 'app-notes',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})


export class NotificationsComponent implements OnInit {
  public users;
  public userid;
  public allnotes;
  public noClasses;
  public allClasses;
  public showNote;
  public src;
 itemCollection: AngularFirestoreCollection<Message>;
  items: Observable<Message[]>

  constructor(public af: AngularFirestore, private as: AuthService, private router: Router, private route: ActivatedRoute) {
  //  this.itemCollection = this.af.collection('/class');
  //  this.items = this.itemCollection.valueChanges();
  this.itemCollection = this.af.collection('/message');
  this.items = this.itemCollection.valueChanges();
    this.userid = this.as.userLoggedIn().uid;
    id = this.route.snapshot.paramMap.get('id');
  //  noNotes = true;
  //  showNote = false;
    this.src='';
    console.log(noNotes);
}

  ngOnInit() {

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
    //this.src = path.getDownloadURL();
  //  showNote = true;

  }
}
