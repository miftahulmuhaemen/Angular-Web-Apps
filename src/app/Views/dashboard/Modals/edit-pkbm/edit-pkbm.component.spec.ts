import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPkbmComponent } from './edit-pkbm.component';

describe('EditPkbmComponent', () => {
  let component: EditPkbmComponent;
  let fixture: ComponentFixture<EditPkbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPkbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPkbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
