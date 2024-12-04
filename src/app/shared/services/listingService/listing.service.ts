import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Listing } from '../../interface/listing';


@Injectable({
  providedIn: 'root'
})

export class ListingService {
  private listingSubject = new BehaviorSubject<Listing[] | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public listing$ = this.listingSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllListings();
  }

  getAllListings(): void {
    if (typeof localStorage === 'undefined') {
      this.listingSubject.next(null);
      this.loadingSubject.next(false);
      return;
    }
  
    const token = localStorage.getItem('authToken');
    this.loadingSubject.next(true);
  
    if (token) {
      try {
        this.http.get<{ properties: Listing[] }>(environment.ApiUrl + 'listings')
          .pipe(delay(1500))
          .subscribe(
            (res) => {
              this.listingSubject.next(res.properties);
              this.loadingSubject.next(false);
            },
            (error) => {
              console.error("Error fetching listings", error);
              this.listingSubject.next(null);
              this.loadingSubject.next(false);
            }
          );
      } catch (error) {
        console.error('Error in the try block', error);
        this.loadingSubject.next(false);
      }
    }
  }
  
}