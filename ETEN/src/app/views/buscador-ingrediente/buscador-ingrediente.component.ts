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
    
    if (!nombreRecetaRecortado) {
      alert("El campo de añadir ingrediente está vacío.");
    } else if (this.ingredientes.length >= this.MAX_TARJETAS) {
      alert("Ya no puedes añadir más ingredientes.");
    } else {
      this.ingredientes.push(nombreRecetaRecortado);
      this.inputNombreReceta.nativeElement.value = "";
      console.log(this.ingredientes);
    }
  }

  eliminarIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
    console.log(this.ingredientes);
  }
}
