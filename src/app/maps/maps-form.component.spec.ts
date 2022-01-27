import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsFormComponent } from './maps-form.component';

describe('MapsFormComponent', () => {
  let component: MapsFormComponent;
  let fixture: ComponentFixture<MapsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
