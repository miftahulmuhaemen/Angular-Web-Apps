import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenAkunComponent } from './manajemen-akun.component';

describe('ManajemenAkunComponent', () => {
  let component: ManajemenAkunComponent;
  let fixture: ComponentFixture<ManajemenAkunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManajemenAkunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenAkunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
