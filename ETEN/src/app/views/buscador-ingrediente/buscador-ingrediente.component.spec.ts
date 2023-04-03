import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorIngredienteComponent } from './buscador-ingrediente.component';

describe('BuscadorIngredienteComponent', () => {
  let component: BuscadorIngredienteComponent;
  let fixture: ComponentFixture<BuscadorIngredienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorIngredienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorIngredienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
