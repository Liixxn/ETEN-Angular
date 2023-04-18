import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorTituloComponent } from './buscador-titulo.component';

describe('BuscadorTituloComponent', () => {
  let component: BuscadorTituloComponent;
  let fixture: ComponentFixture<BuscadorTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorTituloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

