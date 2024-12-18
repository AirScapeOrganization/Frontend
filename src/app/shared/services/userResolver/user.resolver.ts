import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../userService/user.service';
import { Observable } from 'rxjs';
import { User } from '../../interface/user';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<User | null> {
  constructor(private userService: UserService) {}

  resolve(): Observable<User | null> {
    if (!this.userService.userSubject.getValue()) {
      this.userService.loadUserFromToken();
    }

    return this.userService.user$.pipe(first());
  }
}
