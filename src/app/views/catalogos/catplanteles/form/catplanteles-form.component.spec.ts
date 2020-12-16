import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatplantelesFormComponent } from './catplanteles-form.component';

describe('CatplantelesFormComponent', () => {
  let component: CatplantelesFormComponent;
  let fixture: ComponentFixture<CatplantelesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatplantelesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatplantelesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
