import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) { }

  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public obtenerRecetaPorId(id_receta:number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerReceta/"+id_receta);

  }

}
