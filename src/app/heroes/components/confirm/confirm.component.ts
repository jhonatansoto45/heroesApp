import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styles: [],
})
export class ConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe //* TRAER LA INFORMACION
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  borrar(): void {
    this.dialogRef.close(true);
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
