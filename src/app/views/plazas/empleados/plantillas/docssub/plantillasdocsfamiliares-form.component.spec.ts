import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsFamiliaresFormComponent } from './plantillasdocsfamiliares-form.component';

describe('PlantillasDocsFamiliaresFormComponent', () => {
  let component: PlantillasDocsFamiliaresFormComponent;
  let fixture: ComponentFixture<PlantillasDocsFamiliaresFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsFamiliaresFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsFamiliaresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
