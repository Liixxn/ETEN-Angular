import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  toastMessage = 'This is a toast'; // This is the string the template is already bound to
  showsToast = false;




  public btnModificarDatosSeleccionado: boolean = false;
  public btnSubscripcionSeleccionada: boolean = false;
  public imagenSeleccionada: string = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';

  constructor(private route: Router) { }

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
