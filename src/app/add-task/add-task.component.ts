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
import {Course} from '../models/course.model';
//import {MessagesModule} from 'primeng/messages';
//import {MessageModule} from 'primeng/message';
//import {MessageService} from 'primeng/components/common/messageservice';

var variable;
export interface Class{
  name: string;
  number: string;
  professor: string;
  notes: any[];
}
export interface User{
  is_notetaker: boolean;
  first_name: string;
  last_name: string;
  classes: any[];
  notes: any[];
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})


export class AddTaskComponent implements OnInit {

  public userid;
  public user;
  public newclass;
  public showInputAlert;
  public currentCourses;
  public course: Class;
  model = new Course('', '', '', '', []);
  itemCollection: AngularFirestoreCollection<Class>;
  //itemDocument: AngularFirestoreDocument<User>
  //items: Observable<User[]>
  	constructor(public af: AngularFirestore, private as: AuthService, private router: Router) {
    this.userid = this.as.userLoggedIn().uid;
    //this.user = this.as.userLoggedIn().classes;
    //this.itemDocument = this.af.('/user/1');
    //this.items = this.itemDocument.valueChanges();
    this.showInputAlert=false;
    }

	ngOnInit() {
    //let user = firebase.auth().currentUser;
    this.currentCourses= this.af.collection('/user').doc(this.userid).ref.get()
    .then(function(doc){
      if(doc.exists){
        console.log(doc.data().classes);
        variable = doc.data().classes;
        console.log(variable);
        return doc.data()
      }
    }).catch(function(error){
      console.log(error);
    });


    /*this.currentCourses = this.af.collection('/user').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        //data.id = a.payload.doc.id;
         return data;

        });
      });*/
    //console.log('new' + this.newclass);
    //this.user.push('hello');

    //console.log(this.course)
	}

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
          this.showInputAlert=true;
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
     email: user.email,
   }
 */
}
