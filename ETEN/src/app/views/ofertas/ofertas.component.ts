import { Component, OnInit } from '@angular/core';
import { Oferta } from "src/app/models/oferta";
import { OfertaService } from "src/app/services/oferta.service";
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})

export class OfertasComponent implements OnInit {
  products: Oferta[] = [];
  page: number = 1;
  currentIndex = -1;


  categoria = "Todos los productos";
  numeroTotal = 0;
  numOfertas = 0;

  constructor(private ofertaService: OfertaService, private route: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.numOfertas = 20;
    this.cargarTodasOfertas(this.categoria);

  }

  public sumarVisita(id_oferta: number) {
    this.ofertaService.sumarVisita(id_oferta).subscribe();
  }


  public cargarTodasOfertas(categoria: string) {


    const todosBotones = document.querySelectorAll(".boton-categoria");
    todosBotones.forEach(boton => boton.classList.remove("button_selected"));
    
    this.page = 1;

    this.categoria = categoria;
    let id_categoria: number;


    switch (categoria) {
      case 'Productos Frescos': {
        id_categoria = 1;
        const miBoton = document.getElementById("Productos Frescos");
        miBoton!.classList.add("button_selected");
        break;
      }
      case 'Despensa': {
        id_categoria = 2;
        const miBoton = document.getElementById("Despensa");
        miBoton!.classList.add("button_selected");
        break;
      }
      case 'Bebidas': {
        id_categoria = 3;
        const miBoton = document.getElementById("Bebidas");
        miBoton!.classList.add("button_selected");
        break;
      }
      default: {
        id_categoria = 0;
        const miBoton = document.getElementById("Todos los productos");
        miBoton!.classList.add("button_selected");
        break;
      }
    }
    this.spinner.show();
    this.ofertaService.obtenerOfertasPorCategoria(id_categoria, this.page).subscribe((data: any[]) => {
      this.products = data[0];
      this.numeroTotal = data[1];

      setTimeout(() => {
        this.spinner.hide();
      }, 1000);

    });
  }


  public handlePageChange(page: number) {
    this.page = page;

    this.cargarTodasOfertas(this.categoria);

    window.scrollTo(0, 0);
  }
}
