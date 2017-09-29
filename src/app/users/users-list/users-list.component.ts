import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: FirebaseListObservable<User[]>;
  user: firebase.User;
  u: FirebaseObjectObservable<User>;

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsersList({
      orderByChild: 'displayName'
    });
  }

}
