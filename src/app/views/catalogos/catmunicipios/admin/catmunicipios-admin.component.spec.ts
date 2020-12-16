import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatmunicipiosAdminComponent } from './catmunicipios-admin.component';

describe('CatmunicipiosAdminComponent', () => {
  let component: CatmunicipiosAdminComponent;
  let fixture: ComponentFixture<CatmunicipiosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatmunicipiosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatmunicipiosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
