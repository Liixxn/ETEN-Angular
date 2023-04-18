import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
@Component({
  selector: 'app-buscador-categoria',
  templateUrl: './buscador-categoria.component.html',
  styleUrls: ['./buscador-categoria.component.scss']
})

export class BuscadorCategoriaComponent {
  recetas: Receta[] = [];

  constructor(private recetaService: RecetaService) {
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
    })
  }
}
