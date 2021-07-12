import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposclaseFormComponent } from './gruposclase-form.component';

describe('GruposclaseFormComponent', () => {
  let component: GruposclaseFormComponent;
  let fixture: ComponentFixture<GruposclaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposclaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposclaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
