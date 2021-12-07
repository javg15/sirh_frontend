import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermgruposFormComponent } from './permgrupos-form.component';

describe('PermgruposFormComponent', () => {
  let component: PermgruposFormComponent;
  let fixture: ComponentFixture<PermgruposFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermgruposFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermgruposFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
