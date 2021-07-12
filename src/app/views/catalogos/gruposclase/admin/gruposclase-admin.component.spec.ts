import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposclaseAdminComponent } from './gruposclase-admin.component';

describe('GruposclaseAdminComponent', () => {
  let component: GruposclaseAdminComponent;
  let fixture: ComponentFixture<GruposclaseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposclaseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposclaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
