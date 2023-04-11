import { Component, OnInit } from '@angular/core';

interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
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

  constructor() {
    this.totalPages = 0;
  }

  ngOnInit(): void {
    this.products = this.generateProducts();
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.setPage(this.currentPage);
  }

  generateProducts(): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= 120; i++) {
      const product: Product = {
        image: `https://via.placeholder.com/300x300?text=Product+${i}`,
        title: `Product ${i}`,
        description: `Description of product ${i}.`,
        price: +(Math.random() * (10 - 1) + 1).toFixed(2)
      };
      products.push(product);
    }
    return products;
  }

  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
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


