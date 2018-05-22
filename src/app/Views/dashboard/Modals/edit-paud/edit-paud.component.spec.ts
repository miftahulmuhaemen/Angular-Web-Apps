import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaudComponent } from './edit-paud.component';

describe('EditPaudComponent', () => {
  let component: EditPaudComponent;
  let fixture: ComponentFixture<EditPaudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
