import { Component } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador-titulo',
  templateUrl: './buscador-titulo.component.html',
  styleUrls: ['./buscador-titulo.component.scss']
})
export class BuscadorTituloComponent {

  nombreRecetaBuscar: string = '';
  nombre: string = '';
  recetas: Receta[] = [];
  

  constructor(private recetaService: RecetaService, private route: Router) { }

  ngOnInit() {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
    })
  }

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

  public abrirInfoReceta(recetaSeleccionada: Receta) {
    alert('Receta Cargada ' + recetaSeleccionada.titulo)
    //this.infoRecetaComponent.recetaSeleccionada = recetaSeleccionada;
    this.route.navigate(['/info-receta',recetaSeleccionada.id]);
    //this.recetaService.recetaSeleccionada = recetaSeleccionada;
    
  }

}