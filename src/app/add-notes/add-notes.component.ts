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
var d = new Date();
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
  public courseNumber;
  public ref;
  public task;
  public uploadProgress;
  public randomId;
  public file;
  public showInputAlert;
  model = new Notes('', '');
  //itemCollection: AngularFirestoreCollection<Class>;
  //itemDocument: AngularFirestoreDocument<User>
  //items: Observable<User[]>
  private basePath;
    constructor(public af: AngularFirestore, private as: AuthService, private router: Router, private afStorage: AngularFireStorage) {
    this.basePath = 'gs://notegator.appspot.com/documents/';
      this.userid = this.as.userLoggedIn().uid;
      this.randomId = Math.random().toString(36).substring(2);
      this.showInputAlert = false;
      //this.filePath = '';
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

    this.file = event.target.files[0];
  }

     //this.uploadProgress = this.task.snapshotChanges()
    //.pipe(Map(s => (s.bytesTransferred / s.totalBytes) * 100));


    private saveNote(){
      //const timestamp = snapshot.get('created_at');
    //  const date = timestamp.toDate();
      const filePath = this.basePath + this.randomId;
      const refer = this.afStorage.ref(filePath);
      console.log(refer);
      const task = refer.put(this.file, { customMetadata: { blah: 'blah' } });
      //const path = refer.getDownloadURL();
      console.log("path");
    //  this.saveNote("gs://notegator.appspot.com/" + filePath);
      return this.af.collection("/notes").add(
        {
          date_uploaded: d,
          day_uploaded: d.getDay(),
          date_for: this.model.date_for,
          uid: this.userid,
          path: filePath,
          courseNumber: this.courseNumber
        }).then((docRef) => {
          if(variable == null){
            variable = [docRef.id];
          } else {
            variable.push(docRef.id);
          }
          var newclass = variable;
          return this.updateUser(newclass);
        }).then((bo) =>{
          this.showInputAlert = true;
          this.router.navigate(['notes', this.userid]);
        }).catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    private updateUser(newclass){
      console.log(newclass, this.userid);
      this.af.collection("/user").doc(this.userid).update({
        notes: newclass
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
