import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaLkpSaComponent } from './lembaga-lkp-sa.component';

describe('LembagaLkpSaComponent', () => {
  let component: LembagaLkpSaComponent;
  let fixture: ComponentFixture<LembagaLkpSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaLkpSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaLkpSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
