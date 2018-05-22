import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahProgramLkpComponent } from './tambah-program-lkp.component';

describe('TambahProgramLkpComponent', () => {
  let component: TambahProgramLkpComponent;
  let fixture: ComponentFixture<TambahProgramLkpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahProgramLkpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahProgramLkpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
