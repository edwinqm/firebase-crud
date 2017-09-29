import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { User } from '../user';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  error: any;
  user: User;

  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  displayName: FormControl;
  address: FormControl;
  phoneNumber: FormControl;
  photoURL: FormControl;
  passwordConfirm: string;

  submitted = false;

  constructor(
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  save() {
    this.userService.createUser(this.user);
    this.user = new User();
    this.submitted = true;
    this.userForm.reset();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.emailSignUp(this.user)
        .then((user) => {
          this.user.uid = user.uid;
          this.save();
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
          this.submitted = false;
        });
    }
  }

  createFormControls() {
    // tslint:disable-next-line:max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(emailRegex)
    ]);
    this.displayName = new FormControl('', [
      Validators.required,
      Validators.minLength(3)]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.address = new FormControl('');
    this.phoneNumber = new FormControl('');
    this.photoURL = new FormControl('');
  }

  createForm() {
    this.userForm = new FormGroup({
      displayName: this.displayName,
      password: this.password,
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: this.email,
      address: this.address,
      phoneNumber: this.phoneNumber,
      photoURL: this.photoURL,
    });

    this.userForm.controls.password.valueChanges.subscribe(data => {
      if (data) {
        data = data.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      }
      this.userForm.controls.passwordConfirm
        .clearValidators();
      this.userForm.controls.passwordConfirm
        .setValidators(Validators.compose([Validators.required, Validators.pattern(data)]));
    });
  }

}

