import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcentrostrabajoAdminComponent } from './catcentrostrabajo-admin.component';

describe('CatcentrostrabajoAdminComponent', () => {
  let component: CatcentrostrabajoAdminComponent;
  let fixture: ComponentFixture<CatcentrostrabajoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcentrostrabajoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcentrostrabajoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
