import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaspersonalFormComponent } from './plantillaspersonal-form.component';

describe('PlantillaspersonalFormComponent', () => {
  let component: PlantillaspersonalFormComponent;
  let fixture: ComponentFixture<PlantillaspersonalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillaspersonalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaspersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
