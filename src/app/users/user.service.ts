import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class UserService {

  private dbPath = '/users';

  users: FirebaseListObservable<User[]> = null;
  user: FirebaseObjectObservable<User> = null;

  constructor(private db: AngularFireDatabase) { }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getUsersList(query = {}): FirebaseListObservable<User[]> {
    this.users = this.db.list(this.dbPath, {
      query: query,
    });
    return this.users;
  }

  // Return a single observable user
  getUser(key: string): FirebaseObjectObservable<User> {
    const itemPath = `${this.dbPath}/${key}`;
    this.user = this.db.object(itemPath);
    return this.user;
  }

  // Create a bramd new user
  createUser(user: User): void {
    this.db.database.ref('users/' + user.uid).set(user)
      .then(() => {
        console.log('success');
      })
      .catch(error => this.handleError(error));
  }

  // Update an exisiting user
  updateUser(key: string, value: any): void {
    this.users.update(key, value)
      .catch(error => this.handleError(error));
  }

  // Deletes a single user
  deleteUser(key: string): void {
    this.users.remove(key)
      .catch(error => this.handleError(error));
  }

  // Deletes the entire list of users
  deleteAll(): void {
    this.users.remove()
      .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error) {
    console.log(error);
    return error;
  }

}
