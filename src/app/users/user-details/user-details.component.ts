import { UserService } from '../user.service';
import { User } from '../user';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onEdit() {
    this.router.navigate(['users', this.user.uid, 'edit']);
  }

  deleteUser() {
    if (confirm('Are you sure you want to delete?')) {
      this.authService.deleteUser({
        email: this.user.email,
        password: '123456'
      });
      this.userService.deleteUser(this.user.uid);
    }
  }

}
