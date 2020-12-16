import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatestatusplazaAdminComponent } from './catestatusplaza-admin.component';

describe('CatestatusplazaAdminComponent', () => {
  let component: CatestatusplazaAdminComponent;
  let fixture: ComponentFixture<CatestatusplazaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatestatusplazaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatestatusplazaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
