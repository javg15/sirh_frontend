import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasclaseAdminComponent } from './horasclase-admin.component';

describe('HorasclaseAdminComponent', () => {
  let component: HorasclaseAdminComponent;
  let fixture: ComponentFixture<HorasclaseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasclaseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasclaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
