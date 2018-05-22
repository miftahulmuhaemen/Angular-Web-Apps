import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPesertaDidikComponent } from './edit-peserta-didik.component';

describe('EditPesertaDidikComponent', () => {
  let component: EditPesertaDidikComponent;
  let fixture: ComponentFixture<EditPesertaDidikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPesertaDidikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPesertaDidikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
