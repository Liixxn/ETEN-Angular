import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador-titulo',
  templateUrl: './buscador-titulo.component.html',
  styleUrls: ['./buscador-titulo.component.scss']
})
export class BuscadorTituloComponent {

  nombreRecetaBuscar:string = '';
  nombre:string = '';
  // obtiene el valor del buscador y lo guarda en la variable nombreRecetaBuscar para mostrarla en el html
  public obtenerTituloReceta() {
      this.nombre = (<HTMLInputElement>document.getElementById('nombreReceta')).value;

    if (this.nombre == '') {
      this.nombreRecetaBuscar = 'No hay recetas que mostrar';
    }
    else {
      this.nombreRecetaBuscar = "Resultados para: " + this.nombre;
    }


  }



}
