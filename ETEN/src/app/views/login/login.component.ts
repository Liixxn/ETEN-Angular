import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailUsuario:string = '';
  contraseniaUsuario:string = '';

  usuarios:Usuario[] = [];
  expresionEmail: any;

  constructor(private usuarioService:UsuarioService) {
}

  ngOnInit() {
    this.cargarUsuarios();
  }

  private cargarUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe((data: Usuario[]) => { 
      this.usuarios = data;
    })
  }

  
  private comprobarUsuario(email:string, contrasenia:string) {

    let usuario: Usuario = new Usuario('', email, contrasenia, 0, '', 0);
    this.usuarioService.login(usuario).subscribe((data:Usuario) => {

      if (data.email == "Email no encontrado") {
        alert("El email introducido no se encuentra registrado");
      }
      else if (data.email == "Contraseña incorrecta") {
        alert("La contraseña introducida es incorrecta.");
      }
      else {
        alert("Se ha logueado correctamente");
      }
    })
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
