import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatregionesFormComponent } from './catregiones-form.component';

describe('CatregionesFormComponent', () => {
  let component: CatregionesFormComponent;
  let fixture: ComponentFixture<CatregionesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatregionesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatregionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
