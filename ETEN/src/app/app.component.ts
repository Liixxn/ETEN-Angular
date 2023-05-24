import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { AutenticacionService } from './services/autenticacion.service';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(private autenticacionService: AutenticacionService, private usuarioService: UsuarioService, private route: Router) { }

  ngOnInit() {
    this.comprobarToken();
  }

  public comprobarToken() {
    if (this.autenticacionService.getToken() != null) {
      if (this.autenticacionService.comprobarToken()) {
        this.usuarioService.refreshToken().subscribe((data: any) => {
          alert('Token valido');
          this.autenticacionService.eliminarToken();
          this.autenticacionService.guardarToken(data.access_token);
          //console.log('Se ha refrescado el token. ' + data.access_token);
          setTimeout(() => {
            this.refrescarToken();
          }, 3000000);
        });
      } else {
        alert('Debe iniciar sesion');
        if (this.autenticacionService.getToken() != null) {
          this.autenticacionService.eliminarToken();
        }
        this.route.navigate(['login']);
      }
    }
  }

  public refrescarToken() {
    this.usuarioService.refreshToken().subscribe((data: any) => {
      this.autenticacionService.guardarToken(data.access_token);
      //console.log('Se ha refrescado el token. ' + data.access_token);
      setTimeout(() => {
        this.refrescarToken();
      }, 3000000);
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
    this.route.navigate(['/']);
  }

  public imgUser() {
    if (this.autenticacionService.obtenerUsuarioDelToken().img != null) {
      return this.autenticacionService.obtenerUsuarioDelToken().img;
    } else {
      return 'assets/imgs/user_white.png';
    }
  }
}
