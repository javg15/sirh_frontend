import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasDocsFormComponent } from './plantillasdocs-form.component';

describe('PlantillasDocsFormComponent', () => {
  let component: PlantillasDocsFormComponent;
  let fixture: ComponentFixture<PlantillasDocsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
