import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingrediente } from '../models/ingrediente';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {

  constructor(private httpClient: HttpClient) { }

  public getRecetaPorIngrediente(ingrediente: string[], pagina: number) {
    return this.httpClient.post<any[]>(environment.apiUrl + "recetas/ingredientes/ObtenerRecetaIngrediente", { "ingredientes": ingrediente, "pagina": pagina });

  }

  public obtenerIngredientes(id_receta: number) {
    return this.httpClient.get<Ingrediente[]>(environment.apiUrl + "recetas/ingredientes/ingredientesUnaReceta/" + id_receta);
  }

}
