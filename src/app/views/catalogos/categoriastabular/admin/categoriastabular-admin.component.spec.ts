import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriastabularAdminComponent } from './categoriastabular-admin.component';

describe('CategoriastabularAdminComponent', () => {
  let component: CategoriastabularAdminComponent;
  let fixture: ComponentFixture<CategoriastabularAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriastabularAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriastabularAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
