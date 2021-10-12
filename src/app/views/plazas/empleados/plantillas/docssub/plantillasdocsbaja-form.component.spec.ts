import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsBajaFormComponent } from './plantillasdocsbaja-form.component';

describe('PlantillasDocsBajaFormComponent', () => {
  let component: PlantillasDocsBajaFormComponent;
  let fixture: ComponentFixture<PlantillasDocsBajaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsBajaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsBajaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
