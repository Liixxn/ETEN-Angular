export class Ingrediente {
    id?: number;
    idReceta: number;
    nombre_ingrediente: string;
    
    constructor(idReceta: number, nombre_ingrediente: string) {
        this.idReceta = idReceta;
        this.nombre_ingrediente = nombre_ingrediente;
    }

}
