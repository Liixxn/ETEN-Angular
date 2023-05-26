import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from '../models/receta';
import { environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private httpClient: HttpClient) { }


  //para el admin en las estadisticas
  public ObtenerTodasRecetas() {
    return this.httpClient.get<Receta[]>(environment.apiUrl + "recetas/ObtenerRecetas");
  }

  public ObtenerNumRecetasPorCategoria() {
    return this.httpClient.get<any[]>(environment.apiUrl + "recetas/ObtenerNumRecetasPorCategoria");
  }

  public cambiarNumRecetasPorPagina(numRecetasPorPagina: number, tipo: number) {
    return this.httpClient.post<any>(environment.apiUrl + "recetas/CambiarNumeroRecetasPagina", {"numReceta": numRecetasPorPagina, "tipoCambio": tipo});
  }

  public ObtenerIdRecetasFavoritas() {
    return this.httpClient.get<number[]>(environment.apiUrl + "recetas/ObtenerIdRecetasFavoritas");
  }

  public ObtenerRecetasPorId(listaIdRecetas: number[]) {
    return this.httpClient.post<Receta[]>(environment.apiUrl + "recetas/ObtenerRecetasPorId", { "ids": listaIdRecetas });
  }

  public ObtenerRecetasPorCategoria(num_categoria: number, pagina: number) {
    return this.httpClient.get<any[]>(environment.apiUrl + "recetas/ObtenerRecetasPorCategoria/" + num_categoria + "/" + pagina);
  }

  public GuardarRecetaFavoritos(id_receta: number) {
    return this.httpClient.get<string>(environment.apiUrl + "recetas/GuardarRecetaFavoritos/" + id_receta);
  }

  public EliminarRecetaFavoritos(id_receta: number) {
    return this.httpClient.get<string>(environment.apiUrl + "recetas/EliminarRecetaFavoritos/" + id_receta);
  }

  public VerificarRecetaFavorita(id_receta: number) {
    return this.httpClient.get<boolean>(environment.apiUrl + "recetas/VerificarRecetaFavorita/" + id_receta);
  }

  public ObtenerUnaRecetas(idReceta: number) {
    return this.httpClient.get<Receta>(environment.apiUrl + "recetas/ObtenerUnaReceta/" + idReceta);
  }

  public BuscarRecetasBuscadorTitulo(pagina: number, titulo: string) {
    return this.httpClient.post<any[]>(environment.apiUrl + "recetas/BuscarReceta", { "pagina": pagina, "titulo": titulo });
  }

  public ObtenerRecetaBuscarEntreFavoritas(recetasFavoritas: number[], titulo: string) {
    return this.httpClient.post<Receta[]>(environment.apiUrl + "recetas/ObtenerRecetaFavoritaUsuario", {"recetasFavoritas": recetasFavoritas, "titulo": titulo });
  }
}
