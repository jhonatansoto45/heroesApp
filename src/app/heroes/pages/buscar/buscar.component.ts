import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  notFound: boolean = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando(): void {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService
      .getHeroePorId(heroe.id!) //* SIEMPRE TENDRA UN VALOR (!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
