import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public user$ = this.userSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  loadUserFromToken(): void {
    if (typeof localStorage === 'undefined') {
      this.userSubject.next(null);
      this.loadingSubject.next(false);
      return;
    }
  
    const token = localStorage.getItem('authToken');
    this.loadingSubject.next(true);
  
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const userId = decoded.sub;
  
        this.getUserById(userId).subscribe(
          (response) => {
            this.userSubject.next({
              id: response.user_id,
              username: response.username,
              role: response.role,
            });
            this.loadingSubject.next(false);
          },
          (error) => {
            console.error('Error fetching user details:', error);
            this.userSubject.next(null);
            this.loadingSubject.next(false);
          }
        );
      } catch (error) {
        console.error('Error decoding token:', error);
        this.userSubject.next(null);
        this.loadingSubject.next(false);
      }
    } else {
      this.userSubject.next(null);
      this.loadingSubject.next(false);
    }
  }

  getUserFromToken(token: string): any | null {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded && decoded.sub) {
        return decoded;
      }
    } catch (error) {
      console.error('Invalid token:', error);
    }
    return null;
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${environment.ApiUrl}user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
  }

  clearUser(): void {
    this.userSubject.next(null);
    this.loadingSubject.next(false);
  }

}
  