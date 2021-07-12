import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreFormComponent } from './semestre-form.component';

describe('SemestreFormComponent', () => {
  let component: SemestreFormComponent;
  let fixture: ComponentFixture<SemestreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemestreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
