import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Ingrediente } from '../models/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public getRecetaPorIngrediente(ingrediente:Ingrediente) {
    return this.httpClient.post<Ingrediente[]>("http://localhost:8000/api/recetas/ObtenerRecetaIngrediente", ingrediente);

  }


}
