import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from 'src/app/models/receta';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { RecetaService } from 'src/app/services/receta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  toastMessage = 'This is a toast'; // mensaje toast
  showsToast = false;

  nombreRecetaFavorita: string = "";
  numeroTotal = 0;

  recetas: Receta[] = [];

  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;

  public usuarioLogueado: Usuario = new Usuario('nombre', 'email', 'pass', 0, 'img', 0);

  public btnModificarDatosSeleccionado: boolean = false;
  public btnSubscripcionSeleccionada: boolean = false;
  public btnSubscripcionForm: boolean = true;
  public btnCambioImg: boolean = true;


  public imagenSeleccionada: string = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';

  constructor(private route: Router, private autenticacionService: AutenticacionService, private usuarioService: UsuarioService, private recetaService: RecetaService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.usuarioLogueado = this.autenticacionService.obtenerUsuarioDelToken();
    this.cargarUsuario();
  }

  public cargarUsuario() {
    this.usuarioService.getUser().subscribe((data: Usuario) => {
      this.usuarioLogueado = data;
      this.comprobarImgAlInicio();
      this.comprobarSubscripcionAlInicio();
      this.cargarRecetasFavoritas();
    })
  }

  public cargarRecetasFavoritas() {

    this.spinner.show();

    this.recetaService.ObtenerIdRecetasFavoritas().subscribe((data: number[]) => {
      this.recetaService.ObtenerRecetasPorId(data).subscribe((data_recetas: Receta[]) => {
        this.recetas = data_recetas;

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);

      });
    })
  }

  public comprobarImgAlInicio() {
    if (this.usuarioLogueado.img == 'img' || this.usuarioLogueado.img == '' || this.usuarioLogueado.img == null) {
      this.imagenSeleccionada = 'https://cdn-icons-png.flaticon.com/512/747/747376.png';
    } else {
      this.imagenSeleccionada = this.usuarioLogueado.img;
    }
  }

  public comprobarSubscripcionAlInicio() {
    if (this.usuarioLogueado.subscripcion == 1) {
      this.btnSubscripcionSeleccionada = true;
    } else {
      this.btnSubscripcionSeleccionada = false;
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


    let nombre = document.getElementById("form_nombre_user") as HTMLInputElement;
    let email = document.getElementById("form_email") as HTMLInputElement;
    let passwordNueva = document.getElementById("form_password_nueva") as HTMLInputElement;
    let passwordNuevaConfirmar = document.getElementById("form_password_nueva_confirmar") as HTMLInputElement;
    let passwordActual = document.getElementById("form_password_actual") as HTMLInputElement;


    if (passwordNueva.value == passwordNuevaConfirmar.value) {
      //comprobamos si la contraseña actual es correcta
      this.usuarioService.comprobarContrasena(passwordActual.value).subscribe((data: string) => {
        if (data == this.usuarioLogueado.password) {

          //passwordNueva = sha1(passwordNueva.value);
          let subscription = 0;
          if (this.btnSubscripcionSeleccionada) {
            subscription = 1;
          } else {
            subscription = 0;
          }

          let usuarioNuevo: Usuario;
          //si el campo de nueva contraseña esta vacio cojemos la contraseña actual para la modificacion del user
          if (passwordNueva.value == '' || passwordNuevaConfirmar.value == '') {
            usuarioNuevo = new Usuario(nombre.value, email.value, passwordActual.value, subscription, this.imagenSeleccionada, 0);
          } else {
            usuarioNuevo = new Usuario(nombre.value, email.value, passwordNueva.value, subscription, this.imagenSeleccionada, 0);
          }
          usuarioNuevo.id = this.usuarioLogueado.id;

          this.usuarioService.modificarUsuario(usuarioNuevo).subscribe((data: any) => {

            this.autenticacionService.guardarToken(data.access_token);
            this.cargarUsuario();
          })

          this.modificarDatos();
          this.lanzarToast('Se han GUARDADO los cambios');

        } else {
          alert('La contraseña actual no es correcta')
        }
      })
    } else {
      alert('Las contraseñas nuevas no coinciden')
    }

  }


  public cancelarCambios() {
    this.modificarDatos();
    this.lanzarToast('Se han CANCELADO los cambios');
  }


  public modificarDatos(): void {
    if (!this.btnModificarDatosSeleccionado) {
      this.lanzarToast('Puedes modificar la informacion de tu perfil');
    }
    this.btnModificarDatosSeleccionado = !this.btnModificarDatosSeleccionado;
    this.hacerInputEditableyNoEditable();
    this.cargarUsuario();
  }

  public lanzarToast(mensaje: string) {
    this.showsToast = !this.showsToast;
    this.toastMessage = mensaje;
    setTimeout(() => {
      this.showsToast = false;
    }, 2500);
  }
  public cerrarToast() {
    this.showsToast = !this.showsToast;
  }

  public hacerInputEditableyNoEditable() {
    let nombre = document.getElementById("form_nombre_user") as HTMLInputElement;
    let email = document.getElementById("form_email") as HTMLInputElement;
    nombre.value = this.usuarioLogueado.nombre;
    email.value = this.usuarioLogueado.email;
    nombre.readOnly = !nombre.readOnly;
    email.readOnly = !email.readOnly;
    //para el btn de la subscripcion
    this.btnSubscripcionForm = !this.btnSubscripcionForm;
    this.btnCambioImg = !this.btnCambioImg;
  }


  public cerrarSesion() {
    alert('Se ha cerrado sesión')
    this.autenticacionService.eliminarToken();
    this.route.navigate(['/']);

  }

  public abrirInfoReceta(recetaSeleccionada: Receta) {
    //this.infoRecetaComponent.recetaSeleccionada = recetaSeleccionada;
    this.route.navigate(['/info-receta', recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
  }


  public obtenerRecetaFavorita() {

    let tituloReceta = (<HTMLInputElement>document.getElementById("nombreReceta")).value;
    tituloReceta = tituloReceta.trim();
    if (tituloReceta == "") {
      alert("Introduzca el titulo de la receta a buscar");
      this.cargarRecetasFavoritas();
    }
    else {
      this.recetaService.ObtenerIdRecetasFavoritas().subscribe((listaIds: number[]) => {
        this.recetaService.ObtenerRecetaBuscarEntreFavoritas(listaIds, tituloReceta).subscribe((data: Receta[]) => {
          this.recetas = data;


          if (this.recetas.length == 0) {
            alert("No se ha encontrado ninguna receta con ese nombre");
            this.cargarRecetasFavoritas();
          }
        })
      })
    }

  }


  public handlePageChange(event: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = event;

    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }
}
