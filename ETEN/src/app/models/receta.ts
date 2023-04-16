export class Receta {

    id?: number;
    categoria: string;
    titulo: string;
    descripcion: string;
    img: string;
    ingredientes: string;
    duracion: string;
    comensales: string;
    dificultad: string;
    activo: number;
    sentimiento_pos: number;
    sentimiento_neg: number;


    constructor(categoria: string, titulo: string, descripcion: string, img: string, ingredientes: string, duracion: string, comensales: string, dificultad: string, activo: number, sentimiento_pos: number, sentimiento_neg: number) {
        this.categoria = categoria;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.img = img;
        this.ingredientes = ingredientes;
        this.duracion = duracion;
        this.comensales = comensales;
        this.dificultad = dificultad;
        this.activo = activo;
        this.sentimiento_pos = sentimiento_pos;
        this.sentimiento_neg = sentimiento_neg;


    }

}
