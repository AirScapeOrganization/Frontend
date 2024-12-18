import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../interface/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

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
              user_id: response.user_id,
              username: response.username,
              email: response.email,
              role: response.role,
              bio: response.bio,
              password: response.password
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

  updateUser(userId: number, updatedData: Partial<User>): Observable<any> {
    return this.http.put(`${environment.ApiUrl}user/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
  

}
  