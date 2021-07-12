import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatquincenaAdminComponent } from './catquincena-admin.component';

describe('CatquincenaAdminComponent', () => {
  let component: CatquincenaAdminComponent;
  let fixture: ComponentFixture<CatquincenaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatquincenaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatquincenaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
