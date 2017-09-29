import { IUser } from './user.interface';
import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../users/user';
import { IAuth } from './auth.interface';
import { Auth } from './auth';

@Injectable()
export class AuthService {

  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  authState: any;
  auth: Auth = new Auth();

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.authState = user;
        this.showNavBar(true);
        this.router.navigateByUrl('/users');
      }
    });
  }

  signIn(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
        (user) => {
          this.authState = user;
          this.showNavBar(true);
          this.router.navigate(['/users']);
          resolve(user);
        }).catch(
        (error) => {
          this.showNavBar(false);
          reject(error);
        });
    });
  }

  logout() {
    firebase.auth().signOut();
    this.auth = new Auth();
    this.showNavBar(false);
    this.router.navigateByUrl('/login');
  }

  get authenticatedUser(): Auth {
    return this.auth;
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest';
    } else {
      return this.authState.displayName || 'User without a Name';
    }
  }

  private showNavBar(ifShow: boolean) {
    this.showNavBarEmitter.emit(ifShow);
  }

  // manage user account

  emailSignUp(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((newUser) => {
          resolve(newUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateProfile(user: IUser): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updateProfile(user)
        .then(function () {
          console.log('profile updated.');
          resolve();
        }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    });

  }

  updateEmail() {

  }

  updatePassword() {

  }

  deleteUser(uid) {

  }

  sendPasswordResetEmail() {

  }

  sendEmailVerification() {

  }

}
