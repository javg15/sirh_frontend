import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasHistorialComponent } from './horas-historial.component';

describe('HorasHistorialComponent', () => {
  let component: HorasHistorialComponent;
  let fixture: ComponentFixture<HorasHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
