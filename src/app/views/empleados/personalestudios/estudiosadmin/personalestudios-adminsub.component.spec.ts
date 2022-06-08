import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEstudiosAdminSubComponent } from './personalestudios-adminsub.component';

describe('PersonalEstudiosAdminSubComponent', () => {
  let component: PersonalEstudiosAdminSubComponent;
  let fixture: ComponentFixture<PersonalEstudiosAdminSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalEstudiosAdminSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEstudiosAdminSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
