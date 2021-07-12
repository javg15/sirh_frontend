import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatquincenaFormComponent } from './catquincena-form.component';

describe('CatquincenaFormComponent', () => {
  let component: CatquincenaFormComponent;
  let fixture: ComponentFixture<CatquincenaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatquincenaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatquincenaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
