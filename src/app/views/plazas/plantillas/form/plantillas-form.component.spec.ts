import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasFormComponent } from './plantillas-form.component';

describe('PlantillasFormComponent', () => {
  let component: PlantillasFormComponent;
  let fixture: ComponentFixture<PlantillasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
