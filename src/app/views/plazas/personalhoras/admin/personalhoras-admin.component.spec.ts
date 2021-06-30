import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalhorasAdminComponent } from './personalhoras-admin.component';

describe('PersonalhorasAdminComponent', () => {
  let component: PersonalhorasAdminComponent;
  let fixture: ComponentFixture<PersonalhorasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalhorasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalhorasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
