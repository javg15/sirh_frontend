import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazasHistorialNominaComponent } from './plazas-historialnomina.component';

describe('PlantillasDocsComponent', () => {
  let component: PlazasHistorialNominaComponent;
  let fixture: ComponentFixture<PlazasHistorialNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazasHistorialNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazasHistorialNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
