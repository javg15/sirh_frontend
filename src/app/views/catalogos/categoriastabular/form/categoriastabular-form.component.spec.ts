import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriastabularFormComponent } from './categoriastabular-form.component';

describe('CategoriastabularFormComponent', () => {
  let component: CategoriastabularFormComponent;
  let fixture: ComponentFixture<CategoriastabularFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriastabularFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriastabularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
