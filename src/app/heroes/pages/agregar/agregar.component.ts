import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publisher: any[] = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //* ACTUALIZAR
      this.heroeService.actualizarHeroe(this.heroe).subscribe((heroe) => {
        console.log('Actualizando heroe', heroe);
      });
    } else {
      //* CREAR
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        console.log(heroe);
        this.router.navigate(['/heroes/editar', heroe.id]);
      });
    }
  }

  borrarHeroe(): void {
    this.heroeService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
      this.router.navigate(['/heroes']);
    });
  }
}
