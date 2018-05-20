import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaPkbmSaComponent } from './lembaga-pkbm-sa.component';

describe('LembagaPkbmSaComponent', () => {
  let component: LembagaPkbmSaComponent;
  let fixture: ComponentFixture<LembagaPkbmSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaPkbmSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaPkbmSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
