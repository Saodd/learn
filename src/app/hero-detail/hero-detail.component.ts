import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../heroes/heroes.component';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor() {
  }

  ngOnInit(): void {
  }

}
