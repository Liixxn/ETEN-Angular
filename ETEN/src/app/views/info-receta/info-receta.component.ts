import { Component, OnInit } from '@angular/core';
import { isNullOrUndef } from 'chart.js/dist/helpers/helpers.core';
import { isEmpty } from 'rxjs';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-info-receta',
  templateUrl: './info-receta.component.html',
  styleUrls: ['./info-receta.component.scss']
})
export class InfoRecetaComponent {

  public recetaSeleccionada: Receta = new Receta('vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 0, 0, 0);

  constructor(private recetaService: RecetaService) { }

  ngOnInit() {
    this.recetaSeleccionada = this.recetaService.recetaSeleccionada;
    if (this.recetaSeleccionada.dificultad==null) {
      this.recetaSeleccionada.dificultad = 'medio';
    }
  }
  ngOnRefresh(){
    this.recetaSeleccionada = this.recetaService.recetaSeleccionada;
  }

}
