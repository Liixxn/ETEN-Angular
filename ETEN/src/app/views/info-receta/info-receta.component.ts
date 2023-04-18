import { Component, OnInit } from '@angular/core';
import { Ingrediente } from 'src/app/models/ingrediente';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss']
})
export class InfoRecetaComponent {

  public pasosReceta = []
  public todosIngredientes: Ingrediente[] = [];
  public recetaSeleccionada: Receta = new Receta('vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 0, 0, 0);

  constructor(private recetaService: RecetaService, private ingredienteService: IngredienteService) { }

  ngOnInit() {
    this.recetaSeleccionada = this.recetaService.recetaSeleccionada;
    this.comprobarDificultadNula();
    this.limpiarDescripcion();

    this.ingredienteService.obtenerIngredientes(this.recetaSeleccionada).subscribe((data: Ingrediente[]) => {
      this.todosIngredientes = data;
    })
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

}
