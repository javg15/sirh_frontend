import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatzonaeconomicaFormComponent } from './catzonaeconomica-form.component';

describe('CatzonaeconomicaFormComponent', () => {
  let component: CatzonaeconomicaFormComponent;
  let fixture: ComponentFixture<CatzonaeconomicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatzonaeconomicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatzonaeconomicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
