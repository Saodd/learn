import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

export interface Hero {
  id: number;
  name: string;
}

const mockHeroes: Hero[] = [
  {id: 11, name: 'Dr Nice'},
  {id: 12, name: 'Narco'},
  {id: 13, name: 'Bombasto'},
  {id: 14, name: 'Celeritas'},
  {id: 15, name: 'Magneta'},
  {id: 16, name: 'RubberMan'}
];

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private url = 'http://localhost:8000/heroes';

  constructor(public msgService: MessageService, private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>([]))
    );
  }

  getHero(id: number): Observable<Hero> {
    const u = this.url + '/' + id.toString();
    return this.http.get<Hero>(u).pipe(
      tap(hero => this.log('fetched hero ' + hero.id)),
      catchError(this.handleError<Hero>(null))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.url, hero).pipe(
      tap(_ => this.log('updated hero ' + hero.id)),
      catchError(this.handleError<Hero>(null))
    );
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.url, hero).pipe(
      tap(_ => this.log('add hero ' + hero.name)),
      catchError(this.handleError<Hero>(null))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const u = this.url + '/' + hero.id.toString();
    return this.http.delete<Hero>(u).pipe(
      catchError(this.handleError<Hero>(null))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.url}/?name=${term}`).pipe(
      catchError(this.handleError<Hero[]>([]))
    );
  }

  private log(message: string) {
    this.msgService.add(`HeroService: ${message}`);
  }

  private handleError<T>(result: T) {
    return (err: any, caught: Observable<T>): Observable<T> => {
      return of(result as T);
    };
  }
}
