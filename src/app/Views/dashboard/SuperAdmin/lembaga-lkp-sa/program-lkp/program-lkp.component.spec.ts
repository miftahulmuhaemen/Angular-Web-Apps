import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramLkpComponent } from './program-lkp.component';

describe('ProgramLkpComponent', () => {
  let component: ProgramLkpComponent;
  let fixture: ComponentFixture<ProgramLkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramLkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramLkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
