import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Todo} from "../app/Models/todo";
import {catchError, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.baseUrl += 'api/todo';
  }

  public get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  public delete(todoId: number): Observable<Todo> {
    return this.http.delete<Todo>(this.baseUrl+`/${todoId}`).pipe(
      tap(_ => console.log(`deleted product id=${_.id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  public create(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo, this.httpOptions).pipe(
      tap(_ => console.log(`todo created  with id=${_.id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
