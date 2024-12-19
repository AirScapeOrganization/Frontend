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
  addListing(listingData: Partial<Listing>, images: File[]): Observable<any> {
  const formData = new FormData();

  Object.keys(listingData).forEach((key) => {
    formData.append(key, listingData[key as keyof Listing] as string);
  });

  images.forEach((image) => {
    formData.append('photos[]', image);  
  });

  console.log('FormData being sent:', formData);

  return this.http.post(`${environment.ApiUrl}listings`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
}
addPhotos(photo: File): Observable<string> {
  const formData = new FormData();
  formData.append('photo', photo);


  return this.http.post<{ uploaded_url: string }>(
    `${environment.ApiUrl}photos`, 
    formData, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }
  ).pipe(
    map(response => response.uploaded_url) // Extraer solo la URL del response
  );
}



  }
  