import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataDinasComponent } from './edit-data-dinas.component';

describe('EditDataDinasComponent', () => {
  let component: EditDataDinasComponent;
  let fixture: ComponentFixture<EditDataDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDataDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
