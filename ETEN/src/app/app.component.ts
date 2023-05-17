import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // navbarOpen = false;
  esAdmin: boolean = false;


  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.modificarAdmin();
  }


  public modificarAdmin() {
    //window.location.reload();
    if (this.autenticacionService.getToken() != null) {
      this.esAdmin = this.autenticacionService.obtenerUsuarioDelToken().es_administrador == 1 ? true : false;
    } else {
      this.esAdmin = false;
    }
  }


  /*
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }
  */
}
