import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

    	constructor( private angularFire: AngularFirestoreModule,  private router: Router) {
    	}

  	ngOnInit() {


  		/*this.getTask().subscribe(res => {
  			this.tasks = res;
  		});*/
  	}

  /*	getTask(){
  		return this.angularFire.list('/user/${:this.user.uid}/classes').valueChanges();
  	}*/

  }
