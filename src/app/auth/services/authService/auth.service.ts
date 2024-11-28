import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

interface AuthState{
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

  login(email:string, password:string){
    this.#state.update(state => ({...state, loading: true, error: null}));

    return this.http.post<any>(environment.ApiUrl + 'login', {email, password})
    .subscribe(
      res => {
        this.#state.set({
          user: res.user,
          token: res.token,
          loading: false,
          error: null
        });
        localStorage.setItem('authToken', res.token);
        console.log('Login succesfully', res);
      },
      error => {
        this.#state.set({
          user: null,
          token: null,
          loading: false,
          error: error.error?.message || 'Error Log In',
        });
        console.error('Error at login: ', error);
      }
    );
  }

  logout(){
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
