import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazasAdminComponent } from './plazas-admin.component';

describe('PlazasAdminComponent', () => {
  let component: PlazasAdminComponent;
  let fixture: ComponentFixture<PlazasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlazasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlazasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
