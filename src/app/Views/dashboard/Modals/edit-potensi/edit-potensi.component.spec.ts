import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotensiComponent } from './edit-potensi.component';

describe('EditPotensiComponent', () => {
  let component: EditPotensiComponent;
  let fixture: ComponentFixture<EditPotensiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPotensiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPotensiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
