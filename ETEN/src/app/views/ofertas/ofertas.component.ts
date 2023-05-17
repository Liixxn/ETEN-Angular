import { Component, OnInit } from '@angular/core';
import { Oferta } from "src/app/models/oferta";
import { OfertaService } from "src/app/services/oferta.service";
import { Router } from '@angular/router';

/*
interface Product {
  idOferta: number;
  imagenOferta: string;
  nombreOferta: string;
  precioActual: number;
  precioAnterior: number;
  categoria: string;
  urlOferta: string;
}
*/

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
    this.cargarOfertas(this.categoria); 
    //this.setPage(this.page);  
      
  }
//Sumar visita
  public sumarVisita(Oferta: Oferta) {
    this.ofertaService.sumarVisita(Oferta).subscribe((data: Oferta) => {
      console.log(data);
    })
  }


  public cargarOfertas(categoria: string) {

    if (categoria == 'Productos Frescos') {


    }
    else if (categoria == 'Despensa') {

    }
    else if (categoria == 'Bebidas') {

    }
    else {
      this.ofertaService.obtenerOfertasPorCategoria(0, this.page).subscribe((data: any[]) => {
        this.products = data[0];
        this.numeroTotal = data[1];
        console.log(this.products);
      })


    
  }
}

/*
  public cargarOfertasCategoria(categoria: string){
    this.selectedcategoria = categoria;
    console.log(categoria);
    console.log(this.selectedcategoria);

    if (categoria == 'Productos Frescos') {
      this.ofertaService.obtenerOfertasPorCategoria(1, this.page).subscribe((data: Oferta[]) => {
        this.filteredProducts = data;
      })
    }
    else if (categoria == 'Despensa') {
      this.ofertaService.obtenerOfertasPorCategoria(2, this.page).subscribe((data: Oferta[]) => {
        this.filteredProducts = data;
      })
    }
    else if (categoria == 'Bebidas') {
      this.ofertaService.obtenerOfertasPorCategoria(3, this.page).subscribe((data: Oferta[]) => {
        this.filteredProducts = data;
      })
    }
    this.filterProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);    
    this.handlePageChange(1);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  */
  
  //se queda aqui
  /*
  selectcategoria(categoria: string): void {

    this.selectedcategoria = categoria;
    this.filterProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.handlePageChange(1); 
    //this.setPage(1)
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  */
  /*
  generateProducts(): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= 120; i++) {
      const categoria = this.categorias[Math.floor(Math.random() * this.categorias.length)];
      const product: Product = {
        imagenOferta: `https://via.placeholder.com/300x300?text=Product+${i}`,
        nombreOferta: `Producto ${i}`,
        precioAnterior: +(Math.random() * (10 - 1) + 1).toFixed(2),
        precioActual: +(Math.random() * (10 - 1) + 1).toFixed(2),
        categoria: categoria,
        urlOferta : `https://via.placeholder.com/300x300?text=Product+${i}`
      };
      products.push(product);
    }
    return products;
  }
*/
  filterProducts(): void {
    if (this.selectedcategoria === '') {
      this.filteredProducts = this.products;
    } else {
      console.log(this.categorias);
      this.filteredProducts = this.products.filter(oferta => oferta.categoria === this.selectedcategoria);
    }
  }

  /*
  setPage(page: number): void {
    this.page = page;
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex); // Usa los productos filtrados
  }
  */

  /*
  previousPage(): void {
    if (this.page > 1) {
      this.setPage(this.page - 1);
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.setPage(this.page + 1);
    }
  }
  */

  //Paginacion
  currentIndex = -1;
  
  //se queda aqui
  public handlePageChange(page: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = page;
    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }
}