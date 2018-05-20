import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PegawaiDinasComponent } from './pegawai-dinas.component';

describe('PegawaiDinasComponent', () => {
  let component: PegawaiDinasComponent;
  let fixture: ComponentFixture<PegawaiDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PegawaiDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PegawaiDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
