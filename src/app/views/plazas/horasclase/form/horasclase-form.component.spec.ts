import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasclaseFormComponent } from './horasclase-form.component';

describe('HorasclaseFormComponent', () => {
  let component: HorasclaseFormComponent;
  let fixture: ComponentFixture<HorasclaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorasclaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasclaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
