import { Component } from '@angular/core';

//graficas


//import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ChartDataset, ChartOptions, ChartType, ChartData } from 'chart.js';
//import { Color } from 'chart.js/dist/types/color';
//import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.scss']
})
export class EstadisticasAdminComponent {


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
    if (this.opcionNombreRecetaSeleccionada) {
      this.todosNombresRecetas = this.todosNombresRecetas.filter(item => item.toLowerCase().includes(this.nombreRecetaSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorNombreUser() {
    if (this.opcionNombreUserSeleccionada) {
      this.todosNombresUsers = this.todosNombresUsers.filter(item => item.toLowerCase().includes(this.nombreUserSeleccionado.toLowerCase()));
      //this.opcionSeleccionada = false;
    }
  }

  filtrarPorEmailUser() {
    if (this.opcionEmailUserSeleccionada) {
      this.todosEmailsUsers = this.todosEmailsUsers.filter(item => item.toLowerCase().includes(this.emailUserSeleccionado.toLowerCase()));
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
    maintainAspectRatio: false,

  };


  constructor() { }

  public doughnutChartClicked(e: any): void {
    console.log(e);
  }

  public doughnutChartHovered(e: any): void {
    console.log(e);
  }
}
