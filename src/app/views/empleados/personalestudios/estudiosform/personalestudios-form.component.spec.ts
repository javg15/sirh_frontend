import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEstudiosFormComponent } from './personalestudios-form.component';

describe('PersonalestudiosFormComponent', () => {
  let component: PersonalEstudiosFormComponent;
  let fixture: ComponentFixture<PersonalEstudiosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalEstudiosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEstudiosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
