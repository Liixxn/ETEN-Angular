import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})



export class SignUpComponent {

    expresionEmail: RegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    nombreUsuario:string = '';
    emailUsuario:string = '';
    emailConfirm:string = '';
    contraseniaUsuario:string = '';
    contraseniaConfirm:string = '';

    usuarios:Usuario[] = [];



    constructor(private usuarioService:UsuarioService) {

    }
    ngOnInit() {

    }
    private cargarUsuarios() {
      this.usuarioService.getAllUsuarios().subscribe((data: Usuario[]) => {
        this.usuarios = data;

      })
    }

    // funcion que registra a un usuario comprobando si ya existe el email o no
    private registrarUsuario(nombre:string, email:string, contrasenia:string) {
      let usuario: Usuario = new Usuario(nombre, email, contrasenia, 0, '', 0);
      this.usuarioService.Registro(usuario).subscribe((data:Usuario) => {
        if (data.email == "Existente") {
          alert("El email introducido ya se encuentra en uso.");
        }
        else {
          alert("Se ha registrado correctamente");
        }
      })
    }



    // funcion que recoge la informacion del registro, comprueba que no haya campos vacios y que los emails y
    // contraseñas coincidan y que el formato del email sea correcto para poder registrarse
    public obtenerDatosRegistro() {

        this.nombreUsuario = (<HTMLInputElement>document.getElementById('registro_nombre')).value;
        this.emailUsuario = (<HTMLInputElement>document.getElementById('registro_email')).value;
        this.emailConfirm = (<HTMLInputElement>document.getElementById('registro_confirme_email')).value;
        this.contraseniaUsuario = (<HTMLInputElement>document.getElementById('registro_password')).value;
        this.contraseniaConfirm = (<HTMLInputElement>document.getElementById('registro_confirme_password')).value;

        if (this.nombreUsuario == "" || this.emailUsuario == "" || this.emailConfirm == "" || this.contraseniaUsuario == "" || this.contraseniaConfirm == "") {
          alert("Por favor, rellene todos los campos.");
        }
        else {

          if ((this.emailUsuario != this.emailConfirm) || (this.contraseniaUsuario != this.contraseniaConfirm)) {
            alert("Comrpuebe que la los campos coincidan.");
          }
          else {
            if (this.emailUsuario) {
              if (!this.expresionEmail.test(this.emailUsuario)) {
                alert("El formato del correo eléctronico no es válido.");
              }
              else {
                this.registrarUsuario(this.nombreUsuario, this.emailUsuario, this.contraseniaUsuario);
              }
            }

          }
        }

    }

}
