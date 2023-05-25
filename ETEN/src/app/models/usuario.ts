export class Usuario {

  id?: number;
  nombre: string;
  email: string;
  password: string;
  subscripcion: number;
  img: string;
  es_administrador: number;

  constructor(nombre: string, email: string, password: string, subscripcion: number, img: string, es_administrador: number) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.subscripcion = subscripcion;
    this.img = img;
    this.es_administrador = es_administrador;
  }


}
