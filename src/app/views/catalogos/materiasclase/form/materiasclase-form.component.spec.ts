import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasclaseFormComponent } from './materiasclase-form.component';

describe('MateriasclaseFormComponent', () => {
  let component: MateriasclaseFormComponent;
  let fixture: ComponentFixture<MateriasclaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriasclaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasclaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
