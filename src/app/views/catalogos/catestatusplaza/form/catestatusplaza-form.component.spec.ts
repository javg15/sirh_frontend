import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatestatusplazaFormComponent } from './catestatusplaza-form.component';

describe('CatestatusplazaFormComponent', () => {
  let component: CatestatusplazaFormComponent;
  let fixture: ComponentFixture<CatestatusplazaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatestatusplazaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatestatusplazaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
