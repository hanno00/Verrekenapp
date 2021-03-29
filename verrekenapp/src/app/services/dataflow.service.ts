import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Person } from './../models/person';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DataflowService {
  private peopleUrl = 'api/people';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET people from the server */
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl).pipe(
      tap((_) => this.log('fetched people')),
      catchError(this.handleError<Person[]>('getPeople', []))
    );
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      tap((_) => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  /** PUT: update the person on the server */
  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.peopleUrl, person, this.httpOptions).pipe(
      tap((_) => this.log(`updated person id=${person.id}`)),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.peopleUrl, person, this.httpOptions).pipe(
      tap((newPerson: Person) => this.log(`added person w/ id=${newPerson.id}`)),
      catchError(this.handleError<Person>('addPerson'))
    );
  }

  /** DELETE: delete the person from the server */
  deletePerson(id: number): Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;

    return this.http.delete<Person>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /* GET people whose name contains search term */
  searchPeople(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty person array.
      return of([]);
    }
    return this.http.get<Person[]>(`${this.peopleUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found people matching "${term}"`)
          : this.log(`no people matching "${term}"`)
      ),
      catchError(this.handleError<Person[]>('searchPeople', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
