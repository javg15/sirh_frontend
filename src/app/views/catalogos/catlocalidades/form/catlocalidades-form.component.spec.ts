import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatlocalidadesFormComponent } from './catlocalidades-form.component';

describe('CatlocalidadesFormComponent', () => {
  let component: CatlocalidadesFormComponent;
  let fixture: ComponentFixture<CatlocalidadesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatlocalidadesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlocalidadesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
