import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasclaseasignarFormComponent } from './horasclaseasignar-form.component';

describe('HorasclaseFormComponent', () => {
  let component: HorasclaseasignarFormComponent;
  let fixture: ComponentFixture<HorasclaseasignarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasclaseasignarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasclaseasignarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
