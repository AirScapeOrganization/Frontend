import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);

  #state = signal<AuthState>({
    user: null,
    token: null,
    loading: false,
    error: null,
  });

  public user = () => this.#state().user;
  public token = () => this.#state().token;
  public loading = () => this.#state().loading;
  public error = () => this.#state().error;

  register(username: string, email: string, password: string, profile_picture: string, bio: string, is_owner: boolean): Observable<any> {
    this.#state.update((state) => ({ ...state, loading: true, error: null }));
    return this.http.post<any>(`${environment.ApiUrl}user`, { username, email, password, profile_picture, bio, is_owner });
  }
  
  handleRegisterResponse(response: any) {
    this.#state.set({
      user: response.user,
      token: response.token,
      loading: false,
      error: null,
    });
  }
  
  handleRegisterError(error: any) {
    this.#state.set({
      user: null,
      token: null,
      loading: false,
      error: error.error?.message || 'Error signing in',
    });
    console.error('Error in registration:', error);
  }
  
  login(email: string, password: string): Observable<any> {
    this.#state.update(state => ({ ...state, loading: true, error: null }));
    return this.http.post<any>(`${environment.ApiUrl}login`, { email, password });
  }

  hadleLoginResponse(response: any) {
    this.#state.set({
      user: response.user,
      token: response.token,
      loading: false,
      error: null
    });
  }

  hadleLoginError(error: any) {
    this.#state.set({
      user: null,
      token: null,
      loading: false,
      error: error.error?.message || 'Error log in',
    });
    console.error('Error in log in', error);
  }

  logout() {
    this.#state.set({
      user: null,
      token: null,
      loading: false,
      error: null
    });

    localStorage.removeItem('authToken');
    console.log('LogOut Succesfully');

  }
}
