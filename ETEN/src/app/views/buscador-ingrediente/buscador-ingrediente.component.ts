import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-buscador-ingrediente',
  templateUrl: './buscador-ingrediente.component.html',
  styleUrls: ['./buscador-ingrediente.component.scss']
})
export class BuscadorIngredienteComponent {
  MAX_TARJETAS = 5;
  ingredientes: string[] = [];

  @ViewChild('nombreReceta') inputNombreReceta!: ElementRef<HTMLInputElement>;
  @ViewChild('contenedorTarjetas') contenedorTarjetas!: ElementRef<HTMLElement>;

  agregarTarjeta() {
    const nombreReceta = this.inputNombreReceta.nativeElement.value.trim();
    const nombreRecetaRecortado = nombreReceta.slice(0, 20) + (nombreReceta.length > 28 ? "..." + nombreReceta[nombreReceta.length - 1] : "");
    
    if (nombreRecetaRecortado && this.ingredientes.length < this.MAX_TARJETAS) {
      this.ingredientes.push(nombreRecetaRecortado);
      this.inputNombreReceta.nativeElement.value = "";
    }
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }
}
