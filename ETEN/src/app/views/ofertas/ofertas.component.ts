import { Component, OnInit } from '@angular/core';

interface Product {
  imagenOferta: string;
  nombreOferta: string;
  precioAnterior: number;
  categoria: string;
}

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})
export class OfertasComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  itemsPerPage: number = 20;
  page: number = 1;
  totalPages: number;
  pages: number[] = [];
  categories: string[] = ['Productos Frescos', 'Despensa', 'Bebidas'];
  selectedcategoria: string = '';
  filteredProducts: Product[] = [];

  constructor() {
    this.totalPages = 0;
  }

  ngOnInit(): void {
    this.products = this.generateProducts();
    this.filterProducts();
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    //this.setPage(this.page);
    this.handlePageChange(this.page)
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  //se queda aqui
  selectcategoria(categoria: string): void {
    this.selectedcategoria = categoria;
    this.filterProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.handlePageChange(1); 
    //this.setPage(1)
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  
  generateProducts(): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= 120; i++) {
      const categoria = this.categories[Math.floor(Math.random() * this.categories.length)];
      const product: Product = {
        imagenOferta: `https://via.placeholder.com/300x300?text=Product+${i}`,
        nombreOferta: `Producto ${i}`,
        precioAnterior: +(Math.random() * (10 - 1) + 1).toFixed(2),
        categoria: categoria
      };
      products.push(product);
    }
    return products;
  }

  filterProducts(): void {
    if (this.selectedcategoria === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.categoria === this.selectedcategoria);
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
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }
}