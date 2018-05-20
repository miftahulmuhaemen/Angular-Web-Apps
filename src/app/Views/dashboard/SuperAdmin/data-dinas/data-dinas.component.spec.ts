import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDinasComponent } from './data-dinas.component';

describe('DataDinasComponent', () => {
  let component: DataDinasComponent;
  let fixture: ComponentFixture<DataDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
