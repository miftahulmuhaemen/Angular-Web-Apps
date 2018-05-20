import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaLkpComponent } from './lembaga-lkp.component';

describe('LembagaLkpComponent', () => {
  let component: LembagaLkpComponent;
  let fixture: ComponentFixture<LembagaLkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaLkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaLkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
