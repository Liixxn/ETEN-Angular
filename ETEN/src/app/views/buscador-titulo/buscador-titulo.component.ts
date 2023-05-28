import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-buscador-titulo',
  templateUrl: './buscador-titulo.component.html',
  styleUrls: ['./buscador-titulo.component.scss']
})
export class BuscadorTituloComponent {

  nombreRecetaBuscar: string = '';
  nombre: string = '';
  recetas: Receta[] = [];

  numeroTotal = 0;
  comprobacionMostrar = 0;

  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;
  numRecetas = 0;


  constructor(private recetaService: RecetaService, private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.cargarRecetas();
  }

  public cargarRecetas() {
    this.spinner.show();
    this.recetaService.BuscarRecetasBuscadorTitulo(this.page, this.nombre).subscribe((dataRecetas: any[]) => {

      this.recetas = dataRecetas[0];
      this.numeroTotal = dataRecetas[1];
      this.numRecetas = dataRecetas[2];

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);


    })
  }


  // obtiene el valor del buscador y lo guarda en la variable nombreRecetaBuscar para mostrarla en el html
  public obtenerTituloReceta() {
    this.nombre = (<HTMLInputElement>document.getElementById('nombreReceta')).value;

    this.page = 1;
    this.numeroTotal = 0;

    if (this.nombre == '') {
      alert('El campo a buscar esta en blanco');
      this.nombreRecetaBuscar = "Todos los resultados";
      this.spinner.show();
      this.recetaService.BuscarRecetasBuscadorTitulo(this.page, this.nombre).subscribe((dataRecetas: any[]) => {

        this.recetas = dataRecetas[0];
        this.numeroTotal = dataRecetas[1];
        this.numRecetas = dataRecetas[2];

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

      })

    }
    else {
      this.spinner.show();
      this.recetaService.BuscarRecetasBuscadorTitulo(this.page, this.nombre).subscribe((dataRecetas: any[]) => {

        this.recetas = dataRecetas[0];
        this.numeroTotal = dataRecetas[1];
        this.comprobacionMostrar = dataRecetas[2];
        this.numRecetas = dataRecetas[2];

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

        if (this.comprobacionMostrar == 0) {
          alert('No hay recetas que mostrar para ' + this.nombre);
          this.nombreRecetaBuscar = "Todos los resultados";
          this.nombre = "";
        }
        else {
          this.nombreRecetaBuscar = "Resultados para: " + this.nombre;
        }
      })
    }
  }



  public abrirInfoReceta(recetaSeleccionada: Receta) {
    //this.infoRecetaComponent.recetaSeleccionada = recetaSeleccionada;
    this.route.navigate(['/info-receta', recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
  }

  public handlePageChange(event: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = event;

    this.cargarRecetas();

    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }

}
