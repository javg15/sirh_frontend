import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsLicenciasFormComponent } from './plantillasdocslicencias-form.component';

describe('PlantillasDocsLicenciasFormComponent', () => {
  let component: PlantillasDocsLicenciasFormComponent;
  let fixture: ComponentFixture<PlantillasDocsLicenciasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsLicenciasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsLicenciasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
