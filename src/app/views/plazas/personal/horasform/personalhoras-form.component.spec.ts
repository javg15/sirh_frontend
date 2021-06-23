import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhorasFormComponent } from './personalhoras-form.component';

describe('PersonalhorasFormComponent', () => {
  let component: PersonalhorasFormComponent;
  let fixture: ComponentFixture<PersonalhorasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalhorasFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhorasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
