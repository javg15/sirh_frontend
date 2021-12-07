import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermgruposAdminComponent } from './permgrupos-admin.component';

describe('PermgruposAdminComponent', () => {
  let component: PermgruposAdminComponent;
  let fixture: ComponentFixture<PermgruposAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermgruposAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermgruposAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
