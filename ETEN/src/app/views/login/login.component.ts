import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailUsuario: string = '';
  contraseniaUsuario: string = '';


  expresionEmail: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;


  constructor(private usuarioService: UsuarioService, private autenticacionService: AutenticacionService, private route: Router) {
  }

  ngOnInit() {

  }


  private comprobarUsuario(email: string, contrasenia: string) {

    let usuario: Usuario = new Usuario('vacio', email, contrasenia, 0, '', 0);
    this.usuarioService.login(usuario).subscribe((data: any) => {
      //alert(data.access_token);
      this.autenticacionService.guardarToken(data.access_token);
      alert('Se ha iniciado sesión correctamente.')
      setTimeout(() => {
        this.refrescarToken();
      }, 40000);


      this.route.navigate(['perfil']);

      /*if (data.nombre == "Usuario no encontrado") {
        alert("El usuario no existe.");
      }
      else if (data.nombre == "Contrasenia incorrecta") {
        alert("Error al inicar sesión.");
      }
      else {
        alert("Se ha iniciado sesión correctamente.");
        if (data.es_administrador) {
          alert('admin')
          this.appComponent.modificarAdmin(true);
        } else {
          alert('no admin')
          this.appComponent.modificarAdmin(false);
        }
      }*/
    })
  }

  public refrescarToken() {
    this.usuarioService.refreshToken().subscribe((data: any) => {
      this.autenticacionService.guardarToken(data.access_token);
      console.log('Se ha refrescado el token. ' + data.access_token);
      setTimeout(() => {
        this.refrescarToken();
      }, 40000);
    });

  }


  public obtenerDatosLogin() {

    this.emailUsuario = (<HTMLInputElement>document.getElementById('email_user')).value;
    this.contraseniaUsuario = (<HTMLInputElement>document.getElementById('contasenia_user')).value;
    if (this.emailUsuario == "" || this.contraseniaUsuario == "") {
      alert("Rellene todos los campos");
    }
    else if (!this.expresionEmail.test(this.emailUsuario)) {
      alert("El formato del email no es correcto");
    }
    else {
      this.comprobarUsuario(this.emailUsuario, this.contraseniaUsuario);
    }
  }

}
