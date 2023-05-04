import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
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
    this.route.navigate(['/info-receta', recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
  }

  public buscarPorCategoria(categoria: string) {

    const todosBotones = document.querySelectorAll(".button");
    todosBotones.forEach(boton => boton.classList.remove("button_selected"));

    this.page = 1;

    switch (categoria) {
      case 'arroz': {
        this.recetaService.ObtenerRecetasPorCategoria(1).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("arroz");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'bebidas': {
        this.recetaService.ObtenerRecetasPorCategoria(2).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("bebidas");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'carne': {
        this.recetaService.ObtenerRecetasPorCategoria(3).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("carne");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'dulce': {
        this.recetaService.ObtenerRecetasPorCategoria(4).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("dulce");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'pasta': {
        this.recetaService.ObtenerRecetasPorCategoria(5).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("bebidas");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'pescado': {
        this.recetaService.ObtenerRecetasPorCategoria(6).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("pescado");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'variado': {
        this.recetaService.ObtenerRecetasPorCategoria(7).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("variado");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'vegetal': {
        this.recetaService.ObtenerRecetasPorCategoria(8).subscribe((data: Receta[]) => {
          this.recetas = data;
          const miBoton = document.getElementById("vegetal");
          miBoton!.classList.add("button_selected");
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

