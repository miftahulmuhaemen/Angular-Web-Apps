import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditManajemenAkunComponent } from './edit-manajemen-akun.component';

describe('EditManajemenAkunComponent', () => {
  let component: EditManajemenAkunComponent;
  let fixture: ComponentFixture<EditManajemenAkunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditManajemenAkunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditManajemenAkunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
