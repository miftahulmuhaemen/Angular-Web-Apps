import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaPaudSaComponent } from './lembaga-paud-sa.component';

describe('LembagaPaudSaComponent', () => {
  let component: LembagaPaudSaComponent;
  let fixture: ComponentFixture<LembagaPaudSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaPaudSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaPaudSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
