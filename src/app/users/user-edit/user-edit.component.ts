import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User;
  private selectedKey: any;
  private subscription: Subscription;

  error: any;
  userForm: FormGroup;
  displayName: FormControl;
  submitted = false;
  changePassword = FormControl;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.subscribeUser();
    this.initForm();
  }

  private subscribeUser() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.selectedKey = params['id'];
          this.userService.getUser(this.selectedKey)
            .subscribe(data => this.user = data);
        }
      }
    );
  }

  private initForm() {
    this.userForm = new FormGroup({
      displayName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)]),
      changePassword: new FormControl('')
    });
  }

  onSubmit() {
    // if (this.userForm.valid) {
    //   if (this.userForm.value.changePassword) {
    //     this.afAuth.auth.sendPasswordResetEmail(this.user)
    //       .then((success) => console.log('Sent Password Reset Email!'))
    //       .catch((error) => console.log(error));
    //   }
    //   this.update();
    // }
  }

  update() {
    this.userService.updateUser(this.selectedKey, this.user);
    this.submitted = true;
  }

}
