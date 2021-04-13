import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasclasedetalleFormComponent } from './horasclasedetalle-form.component';

describe('HorasclasedetalleFormComponent', () => {
  let component: HorasclasedetalleFormComponent;
  let fixture: ComponentFixture<HorasclasedetalleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasclasedetalleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasclasedetalleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
