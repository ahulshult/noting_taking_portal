import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

	public tasks;

  	constructor(private angularFire: AngularFirestoreModule) {

  	}

	ngOnInit() {
	/*	this.getTask().subscribe(res => {
			this.tasks = res;
		});*/
	}

/*	getTask(){
		return this.angularFire.list('/task').valueChanges();
	}
*/
}
