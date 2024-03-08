import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cat } from './Cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
private catsUrl = environment.catFunctionsUrl;

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(this.catsUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createCat(cat: Cat): Observable<Cat> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const newCat = {...cat, id: null };
    return this.http.post<Cat>(this.catsUrl + '/Create', newCat, { headers })
    .pipe(
      tap(data => console.log('createCat: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteCat(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.catsUrl}/${id}`;
    return this.http.delete<Cat>(url, { headers })
      .pipe(
        tap(data => console.log('deleteCat: ' + id)),
        catchError(this.handleError)
      );
  }

  updateCat(cat: Cat): Observable<Cat> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.catsUrl}/${cat.id}`;
    return this.http.put<Cat>(url, cat, { headers })
      .pipe(
        tap(() => console.log('updateCat: ' + cat.id)),
        // Return the product on an update
        map(() => cat),
        catchError(this.handleError)
      );
  }

  // tslint:disable-next-line: typedef
  private handleError(err: any) {
       // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
