import { Component, OnInit } from '@angular/core';
import { Oferta } from "src/app/models/oferta";
import { OfertaService } from "src/app/services/oferta.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})

export class OfertasComponent implements OnInit {
  products: Oferta[] = [];
  paginatedProducts: Oferta[] = [];
  itemsPerPage: number = 20;
  page: number = 1;
  totalPages: number;
  pages: number[] = [];
  categorias: string[] = ['Productos Frescos', 'Despensa', 'Bebidas'];
  selectedcategoria: string = '';
  filteredProducts: Oferta[] = [];
  ofertasFresco: Oferta[] = [];
  ofertasDespensa: Oferta[] = [];
  ofertasBebidas: Oferta[] = [];

  tipoOferta = 0;
  categoria = "";
  numeroTotal = 0;

  constructor(private ofertaService: OfertaService, private route: Router) { 
    this.totalPages = 0;
  }

  ngOnInit(): void{
    this.cargarTodasOfertas(this.categoria); 
    //this.setPage(this.page);  
      
  }

  public sumarVisita(Oferta: Oferta) {
    this.ofertaService.sumarVisita(Oferta).subscribe((data: Oferta) => {
      console.log(data);
    })
  }


  /*
  public cargarTodasOfertas(categoria: string) {

    this.categoria = categoria;

    if (categoria == 'Productos Frescos') {
      this.ofertaService.obtenerOfertasPorCategoria(1, this.page).subscribe((data: any[]) => {
        this.products = data[0];
        this.numeroTotal = data[1];
        console.log(this.products);
        //this.page = 1;
        
      })

    }
    else if (categoria == 'Despensa') {
      this.ofertaService.obtenerOfertasPorCategoria(2, this.page).subscribe((data: any[]) => {
        this.products = data[0];
        this.numeroTotal = data[1];
        console.log(this.products);
        //this.page = 1;
      })
    }
    else if (categoria == 'Bebidas') {
      this.ofertaService.obtenerOfertasPorCategoria(3, this.page).subscribe((data: any[]) => {
        this.products = data[0];
        this.numeroTotal = data[1];
        console.log(this.products);
        //this.page = 1;
     
      })
    }
    else {
      this.ofertaService.obtenerOfertasPorCategoria(0, this.page).subscribe((data: any[]) => {
        this.products = data[0];
        this.numeroTotal = data[1];
        console.log(this.products.length);
        //this.page = 1;
      
      })
    
  }
  }*/

  public cargarTodasOfertas(categoria: string): void {
    this.categoria = categoria;
  
    let id_categoria: number;
  
    switch (categoria) {
      case 'Productos Frescos':
        id_categoria = 1;
        break;
      case 'Despensa':
        id_categoria = 2;
        break;
      case 'Bebidas':
        id_categoria = 3;
        break;
      default:
        id_categoria = 0;
        break;
    }
  
    this.ofertaService.obtenerOfertasPorCategoria(id_categoria, this.page).subscribe((data: any[]) => {
      this.products = data[0];
      this.numeroTotal = data[1];
      console.log(this.products);
  
      this.filterProducts();
    });
  }  

  filterProducts(): void {
    if (this.selectedcategoria == '') {
      this.filteredProducts = this.products;
    } else {
      console.log(this.categorias);
      this.filteredProducts = this.products.filter(oferta => oferta.categoria.includes(this.selectedcategoria));
    }
  }


  //Paginacion
  

  currentIndex = -1;
  
  public handlePageChange(page: number) {
    this.page = page;

    this.cargarTodasOfertas(this.categoria);
    
    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));
    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }
}