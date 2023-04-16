import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PruebasAngular';

  navbarOpen = false;
  esAdmin: boolean = false;

  ngOnInit() {
    /*
      if (data.es_administrador) {
        this.esAdmin = true;
      }
      */
    this.esAdmin = true;
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
