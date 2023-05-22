import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) { }


  //para el admin en las estadisticas
  public ObtenerTodasRecetas() {
    return this.httpClient.get<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetas");
  }

  public ObtenerIdRecetasFavoritas() {
    return this.httpClient.get<number[]>("http://localhost:8000/api/recetas/ObtenerIdRecetasFavoritas");
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorId", { "ids": listaIdRecetas });
  }

  public ObtenerRecetasPorCategoria(num_categoria: number, pagina: number) {
    return this.httpClient.get<any[]>("http://localhost:8000/api/recetas/ObtenerRecetasPorCategoria/" + num_categoria + "/" + pagina);
  }

  public GuardarRecetaFavoritos(id_receta: number) {
    return this.httpClient.get<string>("http://localhost:8000/api/recetas/GuardarRecetaFavoritos/" + id_receta);
  }

  public EliminarRecetaFavoritos(id_receta: number) {
    return this.httpClient.get<string>("http://localhost:8000/api/recetas/EliminarRecetaFavoritos/" + id_receta);
  }

  public VerificarRecetaFavorita(id_receta: number) {
    return this.httpClient.get<boolean>("http://localhost:8000/api/recetas/VerificarRecetaFavorita/" + id_receta);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>("http://localhost:8000/api/recetas/ObtenerUnaReceta/" + idReceta);
  }

  public BuscarRecetasBuscadorTitulo(pagina: number, titulo: string) {
    return this.httpClient.post<any[]>("http://localhost:8000/api/recetas/BuscarReceta", { "pagina": pagina, "titulo": titulo });
  }

  public ObtenerRecetaBuscarEntreFavoritas(recetasFavoritas: number[], titulo: string) {
    return this.httpClient.post<Receta[]>("http://localhost:8000/api/recetas/ObtenerRecetaFavoritaUsuario", {"recetasFavoritas": recetasFavoritas, "titulo": titulo });

}
