import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreAdminComponent } from './semestre-admin.component';

describe('SemestreAdminComponent', () => {
  let component: SemestreAdminComponent;
  let fixture: ComponentFixture<SemestreAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemestreAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestreAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
