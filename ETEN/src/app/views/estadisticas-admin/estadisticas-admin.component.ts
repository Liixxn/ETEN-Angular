import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent {


  /* ---------- AYUDA PARA ESCRIBIR EN LOS CAMPOS DE TEXTO PARA BUSCAR ---------- */
  data = ['opcion 1', 'Banana', 'banammmmmmm', 'optico', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba'];
  todosNombresRecetas = this.data;
  nombreRecetaSeleccionado: string = '';
  opcionNombreRecetaSeleccionada: boolean = true;

  data2 = ['aaa', 'Banana', 'banammmmmmm', 'optico', 'prueba', 'prueba', 'prueba', 'prueba'];
  todosNombresUsers = this.data2;
  nombreUserSeleccionado: string = '';
  opcionNombreUserSeleccionada: boolean = true;

  data3 = ['aaa@gmail.com', 'prueba_3@gmail.com', 'prueba_2@gmail.com', 'prueba_1@gmail.com', 'prueba_1@gmail.com', 'xxxx@gmail.com', 'aaaccccc@gmail.com', 'aaabbbbbb@gmail.com'];
  todosEmailsUsers = this.data3;
  emailUserSeleccionado: string = '';
  opcionEmailUserSeleccionada: boolean = true;

  filtrarPorNombreReceta() {
    if (this.opcionNombreRecetaSeleccionada) {
      this.todosNombresRecetas = this.todosNombresRecetas.filter(item => item.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorNombreUser() {
    if (this.opcionNombreUserSeleccionada) {
      this.todosNombresUsers = this.todosNombresUsers.filter(item => item.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorEmailUser() {
    if (this.opcionEmailUserSeleccionada) {
      this.todosEmailsUsers = this.todosEmailsUsers.filter(item => item.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  onClickNombreReceta() {
    this.opcionNombreRecetaSeleccionada = false;
    this.todosNombresRecetas = this.data;
  }

  onClickNombreUser() {
    this.opcionNombreUserSeleccionada = false;
    this.todosNombresUsers = this.data2;
  }

  onClickEmailUser() {
    this.opcionEmailUserSeleccionada = false;
    this.todosEmailsUsers = this.data3;
  }
  /* ---------- FIN AYUDA PARA ESCRIBIR EN LOS CAMPOS DE TEXTO PARA BUSCAR ---------- */
}
