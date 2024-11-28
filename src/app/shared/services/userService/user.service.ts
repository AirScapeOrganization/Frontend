import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay} from 'rxjs';
import { environment } from '../../../../environments/environment.development';

interface State{
  users: any[];
  loading: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject( HttpClient);

  #state = signal<State>({
    loading: false,
    users: [],
  });

  public users = computed( () => this.#state().users );
  public loading = computed( () => this.#state().loading );

  constructor() {
    this.#state.update(state => ({ ...state, loading: true }));
  
    this.http.get<any>(environment.ApiUrl + "user")
      .pipe(delay(2000))
      .subscribe(
        res => {
          this.#state.set({
            users: res.users,
            loading: false,
          });
          
        },
        error => {
          console.error("Error fetching users:", error);
          this.#state.set({ ...this.#state(), loading: false });
        }
      );
  }
  
}
