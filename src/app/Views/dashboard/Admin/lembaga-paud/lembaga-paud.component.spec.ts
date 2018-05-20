import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LembagaPaudComponent } from './lembaga-paud.component';

describe('LembagaPaudComponent', () => {
  let component: LembagaPaudComponent;
  let fixture: ComponentFixture<LembagaPaudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembagaPaudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LembagaPaudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
