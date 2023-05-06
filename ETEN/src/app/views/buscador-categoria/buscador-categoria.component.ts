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


  numeroTotal = 0;
  comprobacionMostrar = 0;
  categoria = 0;

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
    this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
      this.recetas = data[0];
      this.numeroTotal = data[1];
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
        this.categoria = 1;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("arroz");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'bebidas': {
        this.categoria = 2;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("bebidas");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'carne': {
        this.categoria = 3;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("carne");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'dulce': {
        this.categoria = 4;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("dulce");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'pasta': {
        this.categoria = 5;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("bebidas");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'pescado': {
        this.categoria = 6;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("pescado");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'variado': {
        this.categoria = 7;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
          const miBoton = document.getElementById("variado");
          miBoton!.classList.add("button_selected");
        })
        break;
      }
      case 'vegetal': {
        this.categoria = 8;
        this.recetaService.ObtenerRecetasPorCategoria(this.categoria, this.page).subscribe((data: any[]) => {
          this.recetas = data[0];
          this.numeroTotal = data[1];
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

    this.cargarRecetas();

    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }


}

