import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEstudiosAdminComponent } from './personalestudios-admin.component';

describe('PersonalEstudiosAdminComponent', () => {
  let component: PersonalEstudiosAdminComponent;
  let fixture: ComponentFixture<PersonalEstudiosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalEstudiosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEstudiosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
