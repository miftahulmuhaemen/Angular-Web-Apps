import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaudDetilComponent } from './paud-detil.component';

describe('PaudDetilComponent', () => {
  let component: PaudDetilComponent;
  let fixture: ComponentFixture<PaudDetilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaudDetilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaudDetilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
