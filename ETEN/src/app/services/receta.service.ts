import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  recetaSeleccionada: any;
  constructor(private httpClient: HttpClient) { }

  //puede ser get
  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerUnaReceta/" + idReceta);
  }


  public ObtenerRecetasPorCategoria(num_categoria: number) {
    return this.httpClient.get<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorCategoria/" + num_categoria);
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorId", { "ids": listaIdRecetas });
  }
  public ObtenerRecetasPorTitulo(titulo: string) {
    return this.httpClient.get<Receta[]>("http://localhost:8000/api/recetas/BuscarReceta/" + titulo);
  }

  public GuardarRecetaFavoritos(id_user: number, id_receta: number) {
    return this.httpClient.post<string>("http://localhost:8000/api/recetas/GuardarRecetaFavoritos", { id_user, id_receta });
  }
  public EliminarRecetaFavoritos(id_user: number, id_receta: number) {
    return this.httpClient.post<string>("http://localhost:8000/api/recetas/EliminarRecetaFavoritos", { id_user, id_receta });
  }

  // es get
  public ObtenerIdRecetasFavoritas(id_user: number) {
    return this.httpClient.post<number[]>("http://localhost:8000/api/recetas/ObtenerIdRecetasFavoritas", { id_user });
  }
}
