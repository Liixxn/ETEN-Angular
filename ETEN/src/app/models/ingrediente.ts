export class Ingrediente {

  id?:number;
  id_receta:number;
  nombre_ingrediente:string;

  constructor(id_receta:number, nombre_ingrediente:string) {
    this.id_receta = id_receta;
    this.nombre_ingrediente = nombre_ingrediente;
  }

}
