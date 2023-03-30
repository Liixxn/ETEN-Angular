import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent {

  data = ['opcion 1', 'Banana', 'banammmmmmm', 'optico', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba'];
  todosNombres = this.data;
  nombreSeleccionado: string = '';
  opcionNombreSeleccionada: boolean = true;

  filtrarPorNombre() {
    if (this.opcionNombreSeleccionada) {
      this.todosNombres = this.data.filter(item => item.toLowerCase().includes(this.nombreSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  onClickNombre() {
    this.opcionNombreSeleccionada = false;
    this.todosNombres = this.data;
  }

}
