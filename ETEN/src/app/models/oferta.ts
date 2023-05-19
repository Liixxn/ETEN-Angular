export class Oferta {
    id ?: number;
    nombreOferta: string;
    precioActual: number;
    precioAnterior: number;
    imagenOferta: string;
    urlOferta: string;
    categoria: string;
    visitas: number;

    constructor(nombreOferta: string, precioActual: number, precioAnterior: number, imagenOferta: string, urlOferta: string, categoria: string, visitas: number) {
        this.nombreOferta = nombreOferta;
        this.precioActual = precioActual;
        this.precioAnterior = precioAnterior;
        this.imagenOferta = imagenOferta;
        this.urlOferta = urlOferta;
        this.categoria = categoria;
        this.visitas = visitas;
    }
}