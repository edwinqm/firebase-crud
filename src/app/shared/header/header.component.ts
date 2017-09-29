import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showNavBar = false;
  user: Observable<firebase.User>;
  email: any;

  constructor(private authService: AuthService, public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.email = user.email;
      }
    });
  }

  ngOnInit() {
    this.authService.showNavBarEmitter.subscribe(
      (mode: boolean) => {
        if (mode != null) {
          this.showNavBar = mode;
        }
      }
    );
  }

  isAuth() {
    return this.authService.authenticated;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
