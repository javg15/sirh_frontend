import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaspercepcionesFormComponent } from './categoriaspercepciones-form.component';

describe('CategoriaspercepcionesFormComponent', () => {
  let component: CategoriaspercepcionesFormComponent;
  let fixture: ComponentFixture<CategoriaspercepcionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaspercepcionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaspercepcionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
