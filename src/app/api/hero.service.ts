import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message.service';

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
  {id: 16, name: 'RubberMan'},
  {id: 17, name: 'Dynama'},
  {id: 18, name: 'Dr IQ'},
  {id: 19, name: 'Magma'},
  {id: 20, name: 'Tornado'}
];

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(public msgService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    this.msgService.add('heroes api success.');
    return of(mockHeroes);
  }

  getHero(id: number): Observable<Hero> {
    this.msgService.add(`hero api {id=${id}} success.`);
    return of(mockHeroes.find(hero => hero.id === id));
  }
}
