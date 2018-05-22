import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPegawaiPenilikComponent } from './edit-pegawai-penilik.component';

describe('EditPegawaiPenilikComponent', () => {
  let component: EditPegawaiPenilikComponent;
  let fixture: ComponentFixture<EditPegawaiPenilikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPegawaiPenilikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPegawaiPenilikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
