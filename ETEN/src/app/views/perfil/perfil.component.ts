import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  toastMessage = 'This is a toast'; // This is the string the template is already bound to
  showsToast = false;


  public usuarioLogueado: Usuario = new Usuario('nombre', 'email', 'pass', 0, 'img', 0);

  public btnModificarDatosSeleccionado: boolean = false;
  public btnSubscripcionSeleccionada: boolean = false;

  public imagenSeleccionada: string = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';

  constructor(private route: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    //let id_usuario = 1;
    let usuario: Usuario = new Usuario('vacio', 'vacio', 'vacio', 0, 'vacio', 0);
    usuario.id = 2;
    this.usuarioService.getUser(usuario).subscribe((data: Usuario) => {
      this.usuarioLogueado = data;
      this.comprobarImgInicio();
    })
  }

  public comprobarImgInicio(){
    if (this.usuarioLogueado.img == 'img' || this.usuarioLogueado.img == '' || this.usuarioLogueado.img == null) {
      this.imagenSeleccionada = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';
      alert('imgseeeeleeeccionada')
    }else{
      this.imagenSeleccionada = this.usuarioLogueado.img;
    }
  }

  public seleccionarImagen(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (!inputElement || !inputElement.files || !inputElement.files[0]) {
        return;
      }
      const archivoSeleccionado = inputElement.files[0];
      const lector = new FileReader();
      lector.readAsDataURL(archivoSeleccionado);
      lector.onload = () => {
        if (lector.result != null) {
          this.imagenSeleccionada = lector.result.toString();
        }
      };
    };
    input.click();
  }

  public subscripcion() {
    this.btnSubscripcionSeleccionada = !this.btnSubscripcionSeleccionada;
  }

  public guardarCambios(): void {
    //Cambios al guardar los datos
    alert('guardar cambios por hacer')
    this.modificarDatos();
  }

  public modificarDatos(): void {
    this.btnModificarDatosSeleccionado = !this.btnModificarDatosSeleccionado;
    this.hacerInputEditableyNoEditable();

    this.showsToast = !this.showsToast;
    setTimeout(() => {
      this.showsToast = false;
    }, 2500);
  }

  public cerrarToast() {
    this.showsToast = !this.showsToast;
  }

  public hacerInputEditableyNoEditable() {
    var nombre = document.getElementById("form_nombre_user") as HTMLInputElement;
    var email = document.getElementById("form_email") as HTMLInputElement;
    nombre.readOnly = !nombre.readOnly;
    email.readOnly = !email.readOnly;
  }

  public cerrarSesion() {
    alert('Se ha cerrado sesion')
    this.route.navigate(['eten']);
  }

}
