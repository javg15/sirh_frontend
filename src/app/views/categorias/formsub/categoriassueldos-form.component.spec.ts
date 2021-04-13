import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriassueldosFormComponent } from './categoriassueldos-form.component';

describe('CategoriassueldosFormComponent', () => {
  let component: CategoriassueldosFormComponent;
  let fixture: ComponentFixture<CategoriassueldosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriassueldosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriassueldosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
