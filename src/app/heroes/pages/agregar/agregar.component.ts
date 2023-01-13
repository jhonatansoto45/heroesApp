import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
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
      this.heroeService
        .actualizarHeroe(this.heroe)
        .subscribe((heroe) => this.mostrarSnackBar('Registro actualizado.'));
    } else {
      //* CREAR
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.mostrarSnackBar('Registro agregado.');
      });
    }
  }

  borrarHeroe(): void {
    this.heroeService.borrarHeroe(this.heroe.id!).subscribe((resp) => {
      this.router.navigate(['/heroes']);
    });
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
