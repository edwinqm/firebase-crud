import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AngularFireAuth, private router: Router) { }

    canActivate(): Observable<boolean> {
        return Observable.from(this.auth.authState)
            .take(1)
            .map(state => !!state)
            .do(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
            });
    }
}