import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss'],
})
export class OfertasComponent implements OnInit {

  ofertas: string[] = [];

  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;


  constructor() {

  }

  ngOnInit(): void {
  this.ofertas.push("Oferta 1");
    this.ofertas.push("Oferta 2");

  }

  public handlePageChange(event: number): void {
    this.page = event;
  }

}
