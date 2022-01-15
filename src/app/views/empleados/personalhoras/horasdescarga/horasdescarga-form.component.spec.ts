import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorasdescargaFormComponent } from './horasdescarga-form.component';

describe('HorasdescargaFormComponent', () => {
  let component: HorasdescargaFormComponent;
  let fixture: ComponentFixture<HorasdescargaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorasdescargaFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorasdescargaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
