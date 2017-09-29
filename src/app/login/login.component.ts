import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;
  email: string;
  password: string;
  state: string;
  error: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService
  ) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.router.navigateByUrl('/users');
      }
    });
  }

  onSubmit(formData) {
    if (formData.valid) {
      this.authService.signIn(formData.value.email, formData.value.password)
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}
