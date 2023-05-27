import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";

import { UsuarioService } from "../../services/usuario.service";
import { Usuario } from "../../models/usuario";
import { RecetaService } from "../../services/receta.service";
import { Receta } from 'src/app/models/receta';
import { OfertaService } from 'src/app/services/oferta.service';
import { Oferta } from 'src/app/models/oferta';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent {

  subscripcionActiva: number = 0;
  usuarioActivo: boolean = false;
  opcionSeleccionada: any = '';
  opcionesActivas: any = '';
  opcionesDeSusb: number = 2;

  labelsReceta = ["Arroz", "Bebidas", "Carnes", "Dulces", "Pastas", "Pescado", "Variados", "Vegetales"];
  numRecetasTotal: number = 0;
  numArroz: number = 0;
  numBebida: number = 0;
  numCarne: number = 0;
  numDulce: number = 0;
  numPasta: number = 0;
  numPescado: number = 0;
  numVariado: number = 0;
  numVegetal: number = 0;


  labelsUsuarios = ["Registrados", "Subscritos"];
  numUsuariosRegistrados: number = 0;
  numUsuariosSubscritos: number = 0;

  labelsOfertas: any = [];
  listaVisitasOfertas: any = [];
  listaOfertasTop: any = [];

  //la declaracion Partial<ChartOptions> puede ser un objeto que contenga algunas pero no todas las propiedades de ChartOptions
  public chartOptionsUsuarios: Partial<ChartOptions> | any;
  public chartOptionsRecetas: Partial<ChartOptions> | any;
  public chartOptionsOfertas: Partial<ChartOptions> | any;


  constructor(private usuarioService: UsuarioService, private recetaService: RecetaService, private ofertaService: OfertaService,
    private spinner: NgxSpinnerService) {
  }

  public todosUsuarios: Usuario[] = [];
  public usuariosFiltrados: Usuario[] = [];
  public recetas: Receta[] = [];
  public recetasFiltradas: Receta[] = [];

  public cambiosPendientesRecetasActivas: number[] = [];

  ngOnInit() {
    this.cargarGraficaRecetas();
    this.cargarGraficasUsuarios();
    this.cargarTopOfertas();
    this.cargarUsuarios();
    this.cargarRecetas();
  }

  public cargarGraficaRecetas() {
    this.spinner.show();
    this.recetaService.ObtenerNumRecetasPorCategoria().subscribe((data: any[]) => {
      this.numArroz = data[0];
      this.numBebida = data[1];
      this.numCarne = data[2];
      this.numDulce = data[3];
      this.numPasta = data[4];
      this.numPescado = data[5];
      this.numVariado = data[6];
      this.numVegetal = data[7];

      this.chartOptionsRecetas = {
        series: [this.numArroz, this.numBebida, this.numCarne, this.numDulce, this.numPasta, this.numPescado, this.numVariado, this.numVegetal],
        chart: {
          width: 400,
          type: "pie",
        },
        labels: this.labelsReceta,
        legend: {
          position: "top"
        },
        responsive: [
          {
            breakpoint: 500,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: "top",
                width: 100,
                fontSize: "10px"
              },
            },
          }
        ],
        colors: ["#F1F1D2", "#0057BA", "#980634", "#F880CE", "#E4DC42", "#0AD6E9", "#9747DD", "#00B84A"],
      };

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);

    });
  }

  public cargarGraficasUsuarios() {

    this.spinner.show();

    this.usuarioService.ObtenerTiposUsuarios().subscribe((data: any[]) => {
      this.numUsuariosRegistrados = data[0];
      this.numUsuariosSubscritos = data[1];

      this.chartOptionsUsuarios = {
        series: [this.numUsuariosRegistrados, this.numUsuariosSubscritos],
        chart: {
          width: 400,
          type: "pie",
        },
        labels: this.labelsUsuarios,
        legend: {
          position: "top"
        },
        responsive: [
          {
            breakpoint: 500,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: "top",
                width: 100,
                fontSize: "10px"
              },
            },
          }
        ],
        colors: ["#F05A21", "#b44593", "#b44593", "#b44593", "#b44593"],
      };

      setTimeout(() => {
        this.spinner.hide();
      }, 2000);

    });
  }

  public cargarTopOfertas() {

    this.spinner.show();

    this.ofertaService.ObtenerTopOfertas().subscribe((data: any[]) => {
      this.listaOfertasTop = data;

      for (let i = 0; i < this.listaOfertasTop.length; i++) {
        this.labelsOfertas.push(this.listaOfertasTop[i]["nombreOferta"]);
        this.listaVisitasOfertas.push(this.listaOfertasTop[i]["visitas"]);
      }

      this.chartOptionsOfertas = {
        series: [this.listaVisitasOfertas[0], this.listaVisitasOfertas[1], this.listaVisitasOfertas[2], this.listaVisitasOfertas[3], this.listaVisitasOfertas[4]],
        chart: {
          width: 400,
          type: "pie",
        },
        labels: this.labelsOfertas,
        legend: {
          position: "top"
        },
        responsive: [
          {
            breakpoint: 500,
            options: {
              chart: {
                width: 250
              },
              legend: {
                position: "top",
                width: 100,
                fontSize: "10px"
              },
            },
          }
        ],
        colors: ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"],
      };
      setTimeout(() => {
        this.spinner.hide();
      }, 2000);

    });
  }


  public cargarUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe((data: Usuario[]) => {
      this.todosUsuarios = data;
      this.usuariosFiltrados = data;

    });

  }

  public cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data;
      this.recetasFiltradas = data;
      console.log(this.recetas);
    });


  }

  /* ---------- AYUDA PARA ESCRIBIR EN LOS CAMPOS DE TEXTO PARA BUSCAR ---------- */
  data = ['opcion 1', 'Banana', 'banammmmmmm', 'optico', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba', 'prueba'];
  todosNombresRecetas = this.data;
  nombreRecetaSeleccionado: string = '';
  opcionNombreRecetaSeleccionada: boolean = true;

  data2 = ['aaa', 'Banana', 'banammmmmmm', 'optico', 'prueba', 'prueba', 'prueba', 'prueba'];
  todosNombresUsers = this.data2;
  nombreUserSeleccionado: string = '';
  opcionNombreUserSeleccionada: boolean = true;

  data3 = ['aaa@gmail.com', 'prueba_3@gmail.com', 'prueba_2@gmail.com', 'prueba_1@gmail.com', 'prueba_1@gmail.com', 'xxxx@gmail.com', 'aaaccccc@gmail.com', 'aaabbbbbb@gmail.com'];
  todosEmailsUsers = this.data3;
  emailUserSeleccionado: string = '';
  opcionEmailUserSeleccionada: boolean = true;

  filtrarPorNombreReceta() {
    console.log(this.recetas);
    if (this.opcionNombreRecetaSeleccionada) {
      //this.todosNombresRecetas = this.todosNombresRecetas.filter(item => item.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));
      this.recetasFiltradas = this.recetas.filter(i => i.titulo.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));

      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorNombreUser() {
    if (this.opcionNombreUserSeleccionada) {
      this.todosNombresUsers = this.todosNombresUsers.filter(item => item.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));

      this.emailUserSeleccionado = "";
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorEmailUser() {
    if (this.opcionEmailUserSeleccionada) {
      this.todosEmailsUsers = this.todosEmailsUsers.filter(item => item.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
      this.nombreUserSeleccionado = "";
      //this.opcionSeleccionada = false;
    }
  }

  onClickNombreReceta() {
    this.opcionNombreRecetaSeleccionada = false;
    this.todosNombresRecetas = this.data;
  }

  onClickNombreUser() {
    this.opcionNombreUserSeleccionada = false;
    this.todosNombresUsers = this.data2;
  }

  onClickEmailUser() {
    this.opcionEmailUserSeleccionada = false;
    this.todosEmailsUsers = this.data3;
  }


  public BuscarInfo() {
    //console.log(this.subscripcionActiva);
    //console.log(this.todosUsuarios);
    //console.log(this.nombreUserSeleccionado);
    //this.usuariosFiltrados = this.todosUsuarios.filter(i => i.nombre === this.nombreUserSeleccionado);
    this.usuariosFiltrados = this.todosUsuarios.filter(i => i.nombre.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));

    //console.log(usuariosFiltrados)

  }

  /*
  public onClickSubscripcion() {
    console.log(this.todosUsuarios);

    if (this.subscripcionActiva) {
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.subscripcion === 1);
    }
    else {
      console.log("entra");
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.subscripcion === 0);
    }
  }
  */

  public buscarRecetaSeleccionada() {
    this.recetasFiltradas = this.recetas

    if (this.opcionSeleccionada != 9) {
      this.recetasFiltradas = this.recetasFiltradas.filter(i => i.categoria.toLowerCase().includes(this.opcionSeleccionada.toLowerCase()));
    }
    if (this.nombreRecetaSeleccionado != "") {
      this.recetasFiltradas = this.recetasFiltradas.filter(i => i.titulo.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));
      //console.log(this.opcionSeleccionada);
    }

    if (this.opcionesActivas != 2) {
      this.recetasFiltradas = this.recetasFiltradas.filter(i => i.activo == (this.opcionesActivas));


    }
    console.log(this.opcionesActivas);

  }

  public filtrar() {
    this.usuariosFiltrados = this.todosUsuarios;
    if (this.nombreUserSeleccionado != "") {
      this.usuariosFiltrados = this.usuariosFiltrados.filter(i => i.nombre.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));
    }

    if (this.emailUserSeleccionado != "") {
      this.usuariosFiltrados = this.usuariosFiltrados.filter(i => i.email.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
    }

    if (this.opcionesDeSusb != 2) {
      this.usuariosFiltrados = this.usuariosFiltrados.filter(i => i.subscripcion == this.opcionesDeSusb);
    }
    console.log(this.opcionesDeSusb);
  }

  public obtenerNumElementos(tipo: number) {

    let numElementosPagina = "";

    if (tipo == 0) {
      numElementosPagina = (<HTMLInputElement>document.getElementById("numRecetasPorPagina")).value;
    }
    else {
      numElementosPagina = (<HTMLInputElement>document.getElementById("numOfertasPorPagina")).value;
    }

    let numero: number = +numElementosPagina;
    if (numElementosPagina != "") {
      if (Number.isInteger(numero)) {
        this.recetaService.cambiarNumRecetasPorPagina(numero, tipo).subscribe((data: any) => {
          if (data.num_recetasPagina == numero) {
            alert("Se ha cambiado el número de elementos por página");
          }
          else {
            alert("No se ha podido cambiar el número de elementos por página");
          }
        });
      }
      else {
        alert("Introduce un formato válido.");
      }
    }
    else {
      alert("Introduce un número de elementos por página");
    }

  }

  public cambPendientes(receta: Receta) {
    if (this.cambiosPendientesRecetasActivas.includes(receta.id!)) {
      const index = this.cambiosPendientesRecetasActivas.indexOf(receta.id!);
      if (index !== -1) {
        this.cambiosPendientesRecetasActivas.splice(index, 1);
      }
    } else {
      this.cambiosPendientesRecetasActivas.push(receta.id!);
    };
  }

  public guardarCambios() {
    this.recetaService.CambiarEstadoReceta(this.cambiosPendientesRecetasActivas).subscribe((data: string) => {
      if (data == "actualizado") {
        alert("Recetas modificadas correctamente");
      }else if(data == "fatall"){
        alert("No se ha podido modificar las recetas");
      }else {
        alert("Se produjo un error al modificar las recetas");
      }
    });

    //Se limpia el array de cambios pendientes
    this.cambiosPendientesRecetasActivas = [];
  }
}








