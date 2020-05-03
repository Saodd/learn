import {Component, OnInit} from '@angular/core';
import {Hero, HeroService} from '../api/hero.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, public msgService: MessageService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(data => this.heroes = data);
  }

  onSelected(hero: Hero) {
    this.selectedHero = hero;
    this.msgService.add(`Selected hero: ${hero.id}.`);
  }

}

