import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasclaseAdminComponent } from './materiasclase-admin.component';

describe('MateriasclaseAdminComponent', () => {
  let component: MateriasclaseAdminComponent;
  let fixture: ComponentFixture<MateriasclaseAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasclaseAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasclaseAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
