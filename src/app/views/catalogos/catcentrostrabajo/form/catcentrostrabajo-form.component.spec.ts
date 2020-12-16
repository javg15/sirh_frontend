import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatcentrostrabajoFormComponent } from './catcentrostrabajo-form.component';

describe('CatcentrostrabajoFormComponent', () => {
  let component: CatcentrostrabajoFormComponent;
  let fixture: ComponentFixture<CatcentrostrabajoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatcentrostrabajoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatcentrostrabajoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
