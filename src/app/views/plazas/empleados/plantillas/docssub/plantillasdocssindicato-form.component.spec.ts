import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsSindicatoFormComponent } from './plantillasdocssindicato-form.component';

describe('PlantillasDocsSindicatoFormComponent', () => {
  let component: PlantillasDocsSindicatoFormComponent;
  let fixture: ComponentFixture<PlantillasDocsSindicatoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsSindicatoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsSindicatoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
