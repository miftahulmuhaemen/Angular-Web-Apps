import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKependidikanComponent } from './edit-kependidikan.component';

describe('EditKependidikanComponent', () => {
  let component: EditKependidikanComponent;
  let fixture: ComponentFixture<EditKependidikanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditKependidikanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKependidikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
