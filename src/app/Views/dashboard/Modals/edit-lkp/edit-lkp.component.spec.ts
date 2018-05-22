import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLkpComponent } from './edit-lkp.component';

describe('EditLkpComponent', () => {
  let component: EditLkpComponent;
  let fixture: ComponentFixture<EditLkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
