import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasAdminComponent } from './plantillas-admin.component';

describe('PlantillasAdminComponent', () => {
  let component: PlantillasAdminComponent;
  let fixture: ComponentFixture<PlantillasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
