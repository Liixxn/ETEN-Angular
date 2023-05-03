import { Component, ViewChild, ElementRef } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-buscador-ingrediente',
  templateUrl: './buscador-ingrediente.component.html',
  styleUrls: ['./buscador-ingrediente.component.scss']
})
export class BuscadorIngredienteComponent {
  MAX_TARJETAS = 5;
  ingredientes: string[] = [];
  ingredientesTarjetas: string[] = [];
  recetasEncontrados: Receta[] = [];
  listaIdsRecetas: number[] = [];


  /* Paginacion */
  currentIndex = -1;
  page = 1;
  count = 0;

  @ViewChild('nombreReceta', { static: true }) inputNombreReceta!: ElementRef<HTMLInputElement>;
  @ViewChild('contenedorTarjetas', { static: true}) contenedorTarjetas!: ElementRef<HTMLElement>;
  recetas: Receta[] = [];

  constructor(private recetaService: RecetaService, private ingredienteService: IngredienteService) {
  }

  ngOnInit() {
    this.cargarRecetas();
  }

  private cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
    })
  }


  public buscarRecetasPorIngrediente() {

    this.ingredienteService.getRecetaPorIngrediente(this.ingredientes).subscribe((data:Receta[]) => {
      this.recetasEncontrados = data;

      if (this.recetasEncontrados.length > 0) {
        alert("Se han encontrado " + this.recetasEncontrados.length + " recetas con los ingredientes seleccionados.")
        this.recetas = this.recetasEncontrados;
      }
      else {
        alert("No se han encontrado recetas con los ingredientes seleccionados.")
        this.cargarRecetas();
      }
    });

  }



  public agregarTarjeta() {
    let inputIngredientes = (<HTMLInputElement>document.getElementById("nombreReceta"));
    const nombreReceta = (<HTMLInputElement>document.getElementById("nombreReceta")).value.trim();
    const nombreRecetaRecortado = nombreReceta.slice(0, 20) + (nombreReceta.length > 28 ? "..." + nombreReceta[nombreReceta.length - 1] : "");

    if (!nombreRecetaRecortado) {
      alert("El campo de añadir ingrediente está vacío.");
    } else if (this.ingredientes.length >= this.MAX_TARJETAS) {
      alert("Ya no puedes añadir más ingredientes.");
    } else {
      this.ingredientes.push(nombreReceta);
      this.ingredientesTarjetas.push(nombreRecetaRecortado);
      inputIngredientes.value = "";

    }
  }

  public eliminarIngrediente(index: number) {
    this.ingredientesTarjetas.splice(index, 1);
    this.ingredientes.splice(index, 1);
    console.log(this.ingredientes);
    console.log(this.ingredientesTarjetas);
  }

  public handlePageChange(event: number) {

    let contenedor = (<HTMLElement>document.getElementById("contenedor-scroll"));

    this.page = event;
    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }


}
