import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatzonageograficaFormComponent } from './catzonageografica-form.component';

describe('CatzonageograficaFormComponent', () => {
  let component: CatzonageograficaFormComponent;
  let fixture: ComponentFixture<CatzonageograficaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatzonageograficaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatzonageograficaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
