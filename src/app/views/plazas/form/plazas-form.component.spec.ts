import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazasFormComponent } from './plazas-form.component';

describe('PlazasFormComponent', () => {
  let component: PlazasFormComponent;
  let fixture: ComponentFixture<PlazasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
