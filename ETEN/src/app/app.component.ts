import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from './views/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PruebasAngular';

  navbarOpen = false;
  esAdmin: boolean = false;

  ngOnInit() { }



  public modificarAdmin(adminBoolean: boolean) {
    this.esAdmin = adminBoolean;
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
