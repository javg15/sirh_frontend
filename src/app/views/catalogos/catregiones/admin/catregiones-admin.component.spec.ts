import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatregionesAdminComponent } from './catregiones-admin.component';

describe('CatregionesAdminComponent', () => {
  let component: CatregionesAdminComponent;
  let fixture: ComponentFixture<CatregionesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatregionesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatregionesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
