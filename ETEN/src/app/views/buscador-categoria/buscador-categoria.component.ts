import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
@Component({
  selector: 'app-buscador-categoria',
  templateUrl: './buscador-categoria.component.html',
  styleUrls: ['./buscador-categoria.component.scss']
})

export class BuscadorCategoriaComponent {
  recetas: Receta[] = [];

  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;


  constructor(private recetaService: RecetaService, private route: Router) {
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
    })
  }

  public abrirInfoReceta(recetaSeleccionada: Receta) {
    alert('Receta Cargada ' + recetaSeleccionada.titulo)
    //this.infoRecetaComponent.recetaSeleccionada = recetaSeleccionada;
    this.route.navigate(['/info-receta',recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
  }

  public buscarPorCategoria(categoria: string) {

    switch (categoria) {
      case 'arroz': {
        this.recetaService.ObtenerRecetasPorCategoria(1).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'bebidas': {
        this.recetaService.ObtenerRecetasPorCategoria(2).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'carne': {
        this.recetaService.ObtenerRecetasPorCategoria(3).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'dulce': {
        this.recetaService.ObtenerRecetasPorCategoria(4).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'pasta': {
        this.recetaService.ObtenerRecetasPorCategoria(5).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'pescado': {
        this.recetaService.ObtenerRecetasPorCategoria(6).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'variado': {
        this.recetaService.ObtenerRecetasPorCategoria(7).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
      case 'vegetal': {
        this.recetaService.ObtenerRecetasPorCategoria(8).subscribe((data: Receta[]) => {
          this.recetas = data;
        })
        break;
      }
    }
  }

  public handlePageChange(event: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = event;
    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }


}

