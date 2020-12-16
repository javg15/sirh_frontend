import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatmunicipiosFormComponent } from './catmunicipios-form.component';

describe('CatmunicipiosFormComponent', () => {
  let component: CatmunicipiosFormComponent;
  let fixture: ComponentFixture<CatmunicipiosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatmunicipiosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatmunicipiosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
