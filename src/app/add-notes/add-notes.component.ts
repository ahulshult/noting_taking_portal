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
import {FormsModule} from '@angular/forms';
import {Notes} from '../models/notes.model';
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
//import {MessagesModule} from 'primeng/messages';
//import {MessageModule} from 'primeng/message';
//import {MessageService} from 'primeng/components/common/messageservice';

var variable;

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})


export class AddNotesComponent implements OnInit {
  public filePath;
  public userid;
  public user;
  public newclass;
  public currentNotes;
  public classNumber;
  public ref;
  public task;
  public uploadProgress;
  model = new Notes('', '', '');
  //itemCollection: AngularFirestoreCollection<Class>;
  //itemDocument: AngularFirestoreDocument<User>
  //items: Observable<User[]>
  private basePath;
    constructor(public af: AngularFirestore, private as: AuthService, private router: Router, private afStorage: AngularFireStorage) {
    basePath = '/uploads';
      this.userid = this.as.userLoggedIn().uid;
      this.filePath = '';
    //this.user = this.as.userLoggedIn().classes;
    //this.itemDocument = this.af.('/user/1');
    //this.items = this.itemDocument.valueChanges();
    }

	ngOnInit() {
    //let user = firebase.auth().currentUser;
    this.currentNotes= this.af.collection('/user').doc(this.userid).ref.get()
    .then(function(doc){
      if(doc.exists){
        console.log(doc.data().notes);
        variable = doc.data().notes;
        console.log(variable);
        return doc.data()
      }
    }).catch(function(error){
      console.log(error);
    });

	}

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
     this.ref = this.afStorage.ref(randomId);
     this.task = this.ref.put(event.target.files[0]);
     //this.uploadProgress = this.task.snapshotChanges()
    //.pipe(Map(s => (s.bytesTransferred / s.totalBytes) * 100));
  }
/*
    saveCourse(){
      return this.af.collection("/class").add(
        {
          classNumber: this.model.classNumber,
          name: this.model.name,
          courseNumber: this.model.courseNumber,
          professor: this.model.professor,
          notes: []
        }).then((docRef) => {
          if(variable == null){
            variable = this.model.classNumber;
          } else {
            variable.push(this.model.classNumber);
          }
          var newclass = variable;
          return this.updateUser(newclass);
        }).then((bo) =>{
          this.router.navigate(['courses', this.userid]);
        }).catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    private updateUser(newclass){
      console.log(newclass + "hi");
      this.af.collection("/user").doc(this.userid).update({
        classes: newclass
      });
      return true;
    }
  /*  private successMessage(){
        this.messageService.add({severity:'success', summary:'Course Successfully Added', detail:'Via MessageService'});
    }
    private errorMessage(){
        this.messageService.add({severity:'error', summary:'Error in adding course. Please try again.', detail:'Via MessageService'});
    }*/
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
     email: user.email,s
   }
 */
}
