import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatzonaeconomicaAdminComponent } from './catzonaeconomica-admin.component';

describe('CatzonaeconomicaAdminComponent', () => {
  let component: CatzonaeconomicaAdminComponent;
  let fixture: ComponentFixture<CatzonaeconomicaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatzonaeconomicaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatzonaeconomicaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
