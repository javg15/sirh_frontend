import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatplantelesAdminComponent } from './catplanteles-admin.component';

describe('CatplantelesAdminComponent', () => {
  let component: CatplantelesAdminComponent;
  let fixture: ComponentFixture<CatplantelesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatplantelesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatplantelesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
