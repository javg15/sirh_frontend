import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazasHistorialComponent } from './plazas-historial.component';

describe('PlantillasDocsComponent', () => {
  let component: PlazasHistorialComponent;
  let fixture: ComponentFixture<PlazasHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazasHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazasHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
