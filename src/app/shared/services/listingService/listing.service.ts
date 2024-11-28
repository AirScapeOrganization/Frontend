import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

interface State{
  listings: any[];
  loading: boolean,
}

@Injectable({
  providedIn: 'root'
})

export class ListingService {
  
  private http = inject(HttpClient)
  
  #state = signal<State>({
    loading: false,
    listings: [],
  });
  
  public listings = computed( () => this.#state().listings);
  public loading = computed( () => this.#state().loading);

  constructor() {
    this.#state.update(state => ({ ...state, loading: true }));
    
    this.http.get<any>(environment.ApiUrl + 'listings')
    .pipe(delay(0))
    .subscribe(
      res => {
        this.#state.set({
          listings: res.properties,
          loading: false,
        });
        console.log("Listings", res.properties);
      },
      error =>{
        console.error("Error fetching listings", error);
        this.#state.set({ ...this.#state(), loading: false});
      }
    );
  }
}
