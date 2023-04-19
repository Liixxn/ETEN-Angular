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
  ingredientesEncontrados: Ingrediente[] = [];
  listaIdsRecetas: number[] = [];

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

    let ingredientesABuscar = this.ingredientes[(this.ingredientes.length)-1];
    let i = new Ingrediente(0, ingredientesABuscar);


    this.ingredienteService.getRecetaPorIngrediente(i).subscribe((data:Ingrediente[]) => {
      this.ingredientesEncontrados = data;
      alert(this.ingredientesEncontrados.length);

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
      //this.inputNombreReceta.nativeElement.value = "";
      this.buscarRecetasPorIngrediente();
      console.log(this.ingredientes);

    }
  }

  public eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
    console.log(this.ingredientes);
  }







}
