import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PengaturanSaComponent } from './pengaturan-sa.component';

describe('PengaturanSaComponent', () => {
  let component: PengaturanSaComponent;
  let fixture: ComponentFixture<PengaturanSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PengaturanSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
