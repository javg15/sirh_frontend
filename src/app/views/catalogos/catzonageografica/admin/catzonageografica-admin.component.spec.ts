import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatzonageograficaAdminComponent } from './catzonageografica-admin.component';

describe('CatzonageograficaAdminComponent', () => {
  let component: CatzonageograficaAdminComponent;
  let fixture: ComponentFixture<CatzonageograficaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatzonageograficaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatzonageograficaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
