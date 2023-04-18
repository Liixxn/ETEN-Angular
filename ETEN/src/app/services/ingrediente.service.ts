import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public obtenerIngredientes(receta:Receta) {
    return this.httpClient.post<Ingrediente[]>("http://localhost:8000/api/receta/ingredientes", receta);
  }
}
