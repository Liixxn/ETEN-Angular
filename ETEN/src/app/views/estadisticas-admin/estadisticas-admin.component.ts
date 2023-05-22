import { Component } from '@angular/core';

//graficas


//import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType, ChartData } from 'chart.js';
import {UsuarioService} from "../../services/usuario.service";
import {Usuario} from "../../models/usuario";
import {RecetaService} from "../../services/receta.service";
import { Receta } from 'src/app/models/receta';
//import { Color } from 'chart.js/dist/types/color';
//import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent {

  subscripcionActiva: number = 0;
  usuarioActivo: boolean = false;
  opcionSeleccionada: any = '';
  
  

  constructor(private usuarioService: UsuarioService, private recetaService: RecetaService) { }
  todosUsuarios:Usuario[] = [];
  usuariosFiltrados:Usuario[] = [];
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRecetas();
  }

  public cargarUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe((data: Usuario[]) => {
      this.todosUsuarios = data
      this.usuariosFiltrados = data
      
    });

  }

  public cargarRecetas() {
    this.recetaService.ObtenerTodasRecetas().subscribe((data: Receta[]) => {
      this.recetas = data
      this.recetasFiltradas = data
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
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.nombre.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));
      this.emailUserSeleccionado = "";
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorEmailUser() {
    if (this.opcionEmailUserSeleccionada) {
      this.todosEmailsUsers = this.todosEmailsUsers.filter(item => item.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.email.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
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
  /* ---------- FIN AYUDA PARA ESCRIBIR EN LOS CAMPOS DE TEXTO PARA BUSCAR ---------- */


  /*
  lineChartData: ChartDataset[] = [
    { data: [12, 72, 78, 75, 17, 75], label: 'Oil Price' },
    { data: [85, 12, 4, 5, 6, 7], label: 'Another' }
  ];

  lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true
  };

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  shuffleData(): void {
    this.lineChartData = [
      { data: this.generateRandomData(), label: 'Oil Price' },
      { data: this.generateRandomData(), label: 'Another' }
    ];
  }

  private generateRandomData(): number[] {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));
  }

*/






  //public doughnutChartLabels: string[] = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  public doughnutChartData: ChartData = {
    labels: ['Pescado', 'Carne', 'Pasta', 'Verdura'],
    datasets: [
      {
        data: [12, 19, 3, 5],
        backgroundColor: [
          'Blue',
          'Red',
          'Orange',
          'Green'
        ]
      }
    ]
  };

  public doughnutChartData2: ChartData = {
    labels: ['p', 'c', 'pa', 'v'],
    datasets: [
      {
        data: [33, 5, 41, 98],
        backgroundColor: [
          'Blue',
          'Red',
          'Orange',
          'Green'
        ]
      }
    ]
  };
  /* Formas de las graficas:
    public doughnutChartType: ChartType = 'line';
    public doughnutChartType: ChartType = 'bar';
    public doughnutChartType: ChartType = 'radar';
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartType: ChartType = 'polarArea';
      */
  public doughnutChartType: ChartType = 'doughnut';


  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false

  };

  public doughnutChartClicked(e: any): void {
    console.log(e);
  }

  public doughnutChartHovered(e: any): void {
    console.log(e);
  }

  public BuscarInfo() {
    //console.log(this.subscripcionActiva);
    //console.log(this.todosUsuarios);
    //console.log(this.nombreUserSeleccionado);
    //this.usuariosFiltrados = this.todosUsuarios.filter(i => i.nombre === this.nombreUserSeleccionado);
    this.usuariosFiltrados = this.todosUsuarios.filter(i => i.nombre.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));
    
    //console.log(usuariosFiltrados)
    
  }

  public onClickSubscripcion() {
    console.log(this.todosUsuarios);

    if(this.subscripcionActiva){
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.subscripcion === 1);
    }
    else{
      console.log("entra");
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.subscripcion === 0);
    }
  }

  public buscarRecetaSeleccionada() {
    this.recetasFiltradas = this.recetas

    if (this.opcionSeleccionada != 9) {
      this.recetasFiltradas = this.recetasFiltradas.filter(i => i.categoria.toLowerCase().includes(this.opcionSeleccionada.toLowerCase()));
    }
   if (this.nombreRecetaSeleccionado !="") {
      this.recetasFiltradas = this.recetasFiltradas.filter(i => i.titulo.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));
    //console.log(this.opcionSeleccionada);

   

   } 

  }

  


  /*public onClickUserActivo() {
    if(this.usuarioActivo){
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.deleted_at === null);
    }
    else{
      this.usuariosFiltrados = this.todosUsuarios.filter(i => i.deleted_at !== null);
    }
  }*/


  
}

