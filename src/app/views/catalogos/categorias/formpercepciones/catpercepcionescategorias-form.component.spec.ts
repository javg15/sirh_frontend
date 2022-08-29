import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatpercepcionescategoriasFormComponent } from './catpercepcionescategorias-form.component';

describe('CatpercepcionescategoriasFormComponent', () => {
  let component: CatpercepcionescategoriasFormComponent;
  let fixture: ComponentFixture<CatpercepcionescategoriasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatpercepcionescategoriasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatpercepcionescategoriasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
