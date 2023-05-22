import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingrediente } from 'src/app/models/ingrediente';
import { Receta } from 'src/app/models/receta';
import { Usuario } from 'src/app/models/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss']
})
export class InfoRecetaComponent {

  //para los parametros de la url 
  //id_receta: number = 0;
  private sub: any;

  public usuarioLogueado: Usuario = new Usuario('vacio', 'vacio', 'vacio', 0, 'vacio', 0);

  public pasosReceta = []
  public todosIngredientes: Ingrediente[] = [];
  public recetaSeleccionada: Receta = new Receta('vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 0, 0, 0);

  public recetaGuardada: boolean = false;

  constructor(private recetaService: RecetaService, private autenticacionService: AutenticacionService, private ingredienteService: IngredienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.recetaSeleccionada = this.recetaService.recetaSeleccionada;
    this.cargarInformacion();


  }

  public cargarInformacion() {
    this.cargarReceta();
  }


  public comprobarRecetaFavorita() {
    this.recetaService.VerificarRecetaFavorita(this.recetaSeleccionada.id!).subscribe((data: boolean) => {
      this.recetaGuardada = data;
    })

  }

  public cargarUsuario() {
    this.usuarioLogueado = this.autenticacionService.obtenerUsuarioDelToken();
    if (this.usuarioLogueado != null) {
      this.comprobarRecetaFavorita();
    } else {
      this.recetaGuardada = false;
    }
  }

  public modificarRecetaGuardada() {

    if (this.usuarioLogueado != null) {
      this.recetaGuardada = !this.recetaGuardada;
      if (this.recetaGuardada) {
        this.recetaService.GuardarRecetaFavoritos(this.recetaSeleccionada.id!).subscribe((data: string) => {
          alert(data);
        })
      } else {
        this.recetaService.EliminarRecetaFavoritos(this.recetaSeleccionada.id!).subscribe((data: string) => {
          alert(data);
        })
      }
    } else {
      alert('Si desea guardar las recetas necesitas iniciar sesión.');
    }
  }


  public cargarReceta() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id_receta = +params['id']; // (+) converts string 'id' to a number
      this.recetaService.ObtenerUnaRecetas(id_receta).subscribe((data: Receta) => {
        this.recetaSeleccionada = data;
        this.comprobarDificultadNula();
        this.limpiarDescripcion();
        this.cargarUsuario();
        this.ingredienteService.obtenerIngredientes(this.recetaSeleccionada.id!).subscribe((data: Ingrediente[]) => {
          this.todosIngredientes = data;
        })
      })
    });
  }

  public comprobarDificultadNula() {
    if (this.recetaSeleccionada.dificultad == 'nan') {
      this.recetaSeleccionada.dificultad = 'Normal'
    }
  }
  public limpiarDescripcion() {
    const arrayDeStrings = JSON.parse(this.recetaSeleccionada.descripcion.replace(/'/g, "\""));
    this.pasosReceta = arrayDeStrings;
  }

  public btnSalir() {
    window.history.back();
  }

}
