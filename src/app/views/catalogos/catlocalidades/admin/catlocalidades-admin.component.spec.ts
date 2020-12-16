import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatlocalidadesAdminComponent } from './catlocalidades-admin.component';

describe('CatlocalidadesAdminComponent', () => {
  let component: CatlocalidadesAdminComponent;
  let fixture: ComponentFixture<CatlocalidadesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatlocalidadesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatlocalidadesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
