import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  recetaSeleccionada: any;
  constructor(private httpClient: HttpClient) { }

  public BuscarRecetasBuscadorTitulo(pagina: number, titulo: string) {
    return this.httpClient.post<any[]>("http://localhost:8000/api/recetas/BuscarReceta", {"pagina":pagina, "titulo":titulo});
  }
  public ObtenerRecetasPorTitulo(titulo: string) {
    return this.httpClient.get<Receta[]>("http://localhost:8000/api/recetas/BuscarReceta/" + titulo);
    //return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/BuscarReceta", {"titulo": titulo});
  }

  public ObtenerTodasRecetas() {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas", null);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerUnaReceta/" + idReceta);
  }

  public ObtenerRecetasPorCategoria(num_categoria: number, pagina: number) {
    return this.httpClient.get<any[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorCategoria/" + num_categoria + "/" + pagina);
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorId", { "ids": listaIdRecetas });
  }


  public GuardarRecetaFavoritos(id_user: number, id_receta: number) {
    return this.httpClient.post<string>("http://localhost:8000/api/recetas/GuardarRecetaFavoritos", { id_user, id_receta });
  }
  public EliminarRecetaFavoritos(id_user: number, id_receta: number) {
    return this.httpClient.post<string>("http://localhost:8000/api/recetas/EliminarRecetaFavoritos", { id_user, id_receta });
  }

  public VerificarRecetaFavorita(id_receta: number) {
    return this.httpClient.get<boolean>("http://localhost:8000/api/recetas/VerificarRecetaFavorita/" + id_receta);
  }

  // es get
  public ObtenerIdRecetasFavoritas(id_user: number) {
    return this.httpClient.post<number[]>("http://localhost:8000/api/recetas/ObtenerIdRecetasFavoritas", { id_user });
  }

  public ObtenerRecetaBuscarEntreFavoritas(recetasFavoritas: number[], titulo: string) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetaFavoritaUsuario", {"recetasFavoritas": recetasFavoritas, "titulo": titulo });
  }

}
