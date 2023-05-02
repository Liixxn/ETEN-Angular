import { Component, ViewChild, ElementRef } from '@angular/core';
import { Receta } from 'src/app/models/receta';
import { IngredienteService } from 'src/app/services/ingrediente.service';
import { RecetaService } from 'src/app/services/receta.service';
import {Ingrediente} from "../../models/ingrediente";

@Component({
  selector: 'app-buscador-ingrediente',
  templateUrl: './buscador-ingrediente.component.html',
  styleUrls: ['./buscador-ingrediente.component.scss']
})
export class BuscadorIngredienteComponent {
  MAX_TARJETAS = 5;
  ingredientes: string[] = [];
  ingredientesTarjetas: string[] = [];
  recetasEncontrados: Ingrediente[] = [];
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

    //let ingredientesABuscar = this.ingredientes[(this.ingredientes.length)-1];
    //let i = new Ingrediente(0, ingredientesABuscar);

    this.ingredienteService.getRecetaPorIngrediente(this.ingredientes).subscribe((data:Ingrediente[]) => {
      this.recetasEncontrados = data;
      alert(this.recetasEncontrados.length);

      if (this.recetasEncontrados.length > 0) {

        alert(this.recetasEncontrados.length);

        for (let i = 0; i < this.recetasEncontrados.length; i++) {
          console.log(this.recetasEncontrados[i].id_receta);
        }


      }

        /*for (let i = 0; i < this.recetasEncontrados.length; i++) {
          if (this.listaIdsRecetas.includes(this.recetasEncontrados[i].id_receta)) {
            this.recetasEncontrados.slice(i, 1);
            console.log("Ya esta" + this.recetasEncontrados[i].id_receta + " en la lista");
          }
          else {
            this.listaIdsRecetas.push(this.recetasEncontrados[i].id_receta);
          }
        }
        alert(this.listaIdsRecetas.length);
        console.log(this.listaIdsRecetas);*/

        /*
        alert(this.listaIdsRecetas.length);
        if (this.listaIdsRecetas.length > 0) {
          console.log(this.listaIdsRecetas);
          this.recetaService.ObtenerRecetasPorId(this.listaIdsRecetas).subscribe((data: Receta[]) => {
            //this.recetas = data;
            console.log(data.length + "recetas");
            alert(data.length);

          });
        }
        else {
          alert("esta vacia");
        }*/

      else {
        this.cargarRecetas();
        alert("esta vacia");
      }

    });

  }



  public agregarTarjeta() {
    const nombreReceta = (<HTMLInputElement>document.getElementById("nombreReceta")).value.trim();
    const nombreRecetaRecortado = nombreReceta.slice(0, 20) + (nombreReceta.length > 28 ? "..." + nombreReceta[nombreReceta.length - 1] : "");

    if (!nombreRecetaRecortado) {
      alert("El campo de añadir ingrediente está vacío.");
    } else if (this.ingredientes.length >= this.MAX_TARJETAS) {
      alert("Ya no puedes añadir más ingredientes.");
    } else {
      this.ingredientes.push(nombreReceta);
      this.ingredientesTarjetas.push(nombreRecetaRecortado);
      //this.inputNombreReceta.nativeElement.value = "";
      console.log(this.ingredientes);

    }
  }

  public eliminarIngrediente(index: number) {
    this.ingredientesTarjetas.splice(index, 1);
    this.ingredientes.splice(index, 1);
    console.log(this.ingredientes);
    console.log(this.ingredientesTarjetas);
  }

  public handlePageChange(event: number) {
    this.page = event;
    //this.contenedorTarjetas.nativeElement.scrollTop = 0;
  }


}
