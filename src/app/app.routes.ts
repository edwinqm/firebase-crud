import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PageNotFoundComponent } from './not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
    { path: 'users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
    { path: 'users/:id/edit', component: UserEditComponent, canActivate: [AuthGuard] },
    { path: '**', component: PageNotFoundComponent }
];
