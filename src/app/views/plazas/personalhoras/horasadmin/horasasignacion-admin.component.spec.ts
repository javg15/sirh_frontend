import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasasignacionAdminComponent } from './horasasignacion-admin.component';

describe('HorasasignacionAdminComponent', () => {
  let component: HorasasignacionAdminComponent;
  let fixture: ComponentFixture<HorasasignacionAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorasasignacionAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasasignacionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
