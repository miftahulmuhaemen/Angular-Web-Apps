import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramLkpEditComponent } from './program-lkp-edit.component';

describe('ProgramLkpEditComponent', () => {
  let component: ProgramLkpEditComponent;
  let fixture: ComponentFixture<ProgramLkpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramLkpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramLkpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
