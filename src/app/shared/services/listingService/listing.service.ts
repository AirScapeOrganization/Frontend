import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { Listing } from '../../interface/listing';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listingSubject = new BehaviorSubject<Listing[] | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public listing$ = this.listingSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllListings(): void {
    if (typeof localStorage === 'undefined') {
      this.listingSubject.next(null);
      this.loadingSubject.next(false);
      return;
    }

    this.loadingSubject.next(true);

    this.http
      .get<{ properties: Listing[] }>(`${environment.ApiUrl}listings`)
      .pipe(
        tap((res) => {
          this.listingSubject.next(res.properties);
        }),
        catchError((error) => {
          console.error('Error fetching listings:', error);
          this.listingSubject.next(null);
          return of(null);
        }),
        tap(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }

  getListingById(id: number): Observable<Listing> {
    return this.http.get<Listing>(`${environment.ApiUrl}listings/${id}`);
  }

  addPhotos(image: File): Observable<string> {
    const formData = new FormData();
    formData.append('photo', image);

    const token = localStorage.getItem('authToken');
    
    return this.http.post<{ uploaded_url: string }>(
      `${environment.ApiUrl}photos`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).pipe(
      map((response) => response.uploaded_url)
    );
  }

  addListing(listingData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const user = this.decodeToken(token);
    console.log('Decoded token:', user);

    const userId = user?.sub;

    if (!userId) {
      throw new Error('User ID not found in token');
    }

    listingData.append('user_id', userId);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(`${environment.ApiUrl}listings`, listingData, { headers }).pipe(
      catchError((error) => {
        console.error('Error adding property:', error);
        return of({ message: 'Error adding property', error });
      })
    );
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded); 
  }
}
