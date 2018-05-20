import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PegawaiDinasSaComponent } from './pegawai-dinas-sa.component';

describe('PegawaiDinasSaComponent', () => {
  let component: PegawaiDinasSaComponent;
  let fixture: ComponentFixture<PegawaiDinasSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PegawaiDinasSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PegawaiDinasSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
