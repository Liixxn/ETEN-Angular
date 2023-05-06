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

  numeroTotal = 0;
  comprobacionMostrar = 0;

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
    this.ingredienteService.getRecetaPorIngrediente(this.ingredientes, this.page).subscribe((data: any[]) => {
      this.recetas = data[0];
      this.numeroTotal = data[1];
      this.comprobacionMostrar = data[2];
    })
  }


  public buscarRecetasPorIngrediente() {

    this.page = 1;
    this.numeroTotal = 0;
    this.comprobacionMostrar = 0;

    this.ingredienteService.getRecetaPorIngrediente(this.ingredientes, this.page).subscribe((data:any[]) => {
      this.recetasEncontrados = data[0];
      this.numeroTotal = data[1];
      this.comprobacionMostrar = data[2];

      if (this.comprobacionMostrar != 0) {
        alert("Se han encontrado " + this.numeroTotal + " recetas con los ingredientes seleccionados.")
        this.recetas = this.recetasEncontrados;
      }
      else {
        alert("No se han encontrado recetas con los ingredientes seleccionados.")
        this.page = 1;
        this.numeroTotal = 0;
        this.comprobacionMostrar = 0;
        this.ingredientes = [];
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

    this.cargarRecetas();

    window.scrollTo(0, 0);
    contenedor.scrollTo(0, 0);
  }


}
