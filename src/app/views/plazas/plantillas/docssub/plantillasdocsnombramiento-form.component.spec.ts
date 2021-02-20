import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsNombramientoFormComponent } from './plantillasdocsnombramiento-form.component';

describe('PlantillasDocsNombramientoFormComponent', () => {
  let component: PlantillasDocsNombramientoFormComponent;
  let fixture: ComponentFixture<PlantillasDocsNombramientoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsNombramientoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsNombramientoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
