import { Component, OnInit } from '@angular/core';

interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
  category: string;
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
  currentPage: number = 1;
  totalPages: number;
  pages: number[] = [];
  categories: string[] = ['Productos Frescos', 'Despensa', 'Bebidas'];
  selectedCategory: string = '';
  filteredProducts: Product[] = [];

  constructor() {
    this.totalPages = 0;
  }

  ngOnInit(): void {
    this.products = this.generateProducts();
    this.filterProducts();
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.setPage(this.currentPage);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    this.setPage(1); 
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  
  generateProducts(): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= 120; i++) {
      const category = this.categories[Math.floor(Math.random() * this.categories.length)];
      const product: Product = {
        image: `https://via.placeholder.com/300x300?text=Product+${i}`,
        title: `Producto ${i}`,
        description: `Descripción del producto ${i}.`,
        price: +(Math.random() * (10 - 1) + 1).toFixed(2),
        category: category
      };
      products.push(product);
    }
    return products;
  }

  filterProducts(): void {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex); // Usa los productos filtrados
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
}


