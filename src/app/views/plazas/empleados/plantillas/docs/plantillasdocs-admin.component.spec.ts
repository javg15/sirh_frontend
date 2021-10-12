import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsAdminComponent } from './plantillasdocs-admin.component';

describe('PlantillasDocsComponent', () => {
  let component: PlantillasDocsAdminComponent;
  let fixture: ComponentFixture<PlantillasDocsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
