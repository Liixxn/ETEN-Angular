import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public getRecetaPorIngrediente(ingrediente: string[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetaIngrediente", {"ingredientes": ingrediente});

  }

  public obtenerIngredientes(receta:Receta) {
    return this.httpClient.post<Ingrediente[]>("http://localhost:8000/api/receta/ingredientes", receta);
  }


}
