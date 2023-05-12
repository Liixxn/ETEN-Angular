import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {
  title: string = 'Hello, world!';
  Examen: any;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Button clicked!');
  }
}
