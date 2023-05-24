import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AutenticacionService } from './services/autenticacion.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  ngOnInit() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0);
    //this.modificarAdmin();
  });
    }

  public esAdmin() {
    return this.autenticacionService.isAdmin();
  }

  public esUsuarioLogueado() {
    return this.autenticacionService.isUsuarioLogueado();
  }

  public cerrarSesion() {
    alert('Se ha cerrado sesion');
    this.autenticacionService.eliminarToken();
  }

  public imgUser() {
    if (this.autenticacionService.obtenerUsuarioDelToken().img != null) {
      return this.autenticacionService.obtenerUsuarioDelToken().img;
    } else {
      return 'assets/imgs/user_white.png';
    }
  }
}
