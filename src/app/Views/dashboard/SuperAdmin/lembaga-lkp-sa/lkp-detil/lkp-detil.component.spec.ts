import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LkpDetilComponent } from './lkp-detil.component';

describe('LkpDetilComponent', () => {
  let component: LkpDetilComponent;
  let fixture: ComponentFixture<LkpDetilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LkpDetilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LkpDetilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
