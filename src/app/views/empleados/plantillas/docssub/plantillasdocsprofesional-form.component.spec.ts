import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsProfesionalFormComponent } from './plantillasdocsprofesional-form.component';

describe('PlantillasDocsProfesionalFormComponent', () => {
  let component: PlantillasDocsProfesionalFormComponent;
  let fixture: ComponentFixture<PlantillasDocsProfesionalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsProfesionalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsProfesionalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
