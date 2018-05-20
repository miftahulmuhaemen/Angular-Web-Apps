import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaPkbmComponent } from './lembaga-pkbm.component';

describe('LembagaPkbmComponent', () => {
  let component: LembagaPkbmComponent;
  let fixture: ComponentFixture<LembagaPkbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaPkbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaPkbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
