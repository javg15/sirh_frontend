import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasdetalleFormComponent } from './categoriasdetalle-form.component';

describe('CategoriasdetalleFormComponent', () => {
  let component: CategoriasdetalleFormComponent;
  let fixture: ComponentFixture<CategoriasdetalleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasdetalleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasdetalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
