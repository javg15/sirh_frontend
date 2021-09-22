import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasHistorialNominaComponent } from './plantillas-historialnomina.component';

describe('PlantillasDocsComponent', () => {
  let component: PlantillasHistorialNominaComponent;
  let fixture: ComponentFixture<PlantillasHistorialNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasHistorialNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasHistorialNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
