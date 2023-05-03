import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-titulo',
  templateUrl: './buscador-titulo.component.html',
  styleUrls: ['./buscador-titulo.component.scss']
})
export class BuscadorTituloComponent {

  nombreRecetaBuscar: string = '';
  nombre: string = '';
  recetas: Receta[] = [];

  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;


  constructor(private recetaService: RecetaService, private route: Router) { }

  ngOnInit() {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
    })
  }

  // obtiene el valor del buscador y lo guarda en la variable nombreRecetaBuscar para mostrarla en el html
  public obtenerTituloReceta() {
    this.nombre = (<HTMLInputElement>document.getElementById('nombreReceta')).value;

    this.recetaService.ObtenerRecetasPorTitulo(this.nombre).subscribe((data: Receta[]) => {
      this.recetas = data;
    })

    if (this.nombre == '') {
      this.nombreRecetaBuscar = 'No hay recetas que mostrar';
    }
    else {
      this.nombreRecetaBuscar = "Resultados para: " + this.nombre;
    }
  }

  public abrirInfoReceta(recetaSeleccionada: Receta) {
    alert('Receta Cargada ' + recetaSeleccionada.titulo)
    //this.infoRecetaComponent.recetaSeleccionada = recetaSeleccionada;
    this.route.navigate(['/info-receta',recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
  }

  public handlePageChange(event: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = event;
    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }

}
