import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  recetaSeleccionada: any;
  constructor(private httpClient: HttpClient) { }

  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerUnaReceta/" + idReceta);
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorId", {"ids":listaIdRecetas});
  }

}
