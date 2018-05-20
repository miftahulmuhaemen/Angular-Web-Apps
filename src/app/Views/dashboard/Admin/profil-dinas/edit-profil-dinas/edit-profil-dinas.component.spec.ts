import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilDinasComponent } from './edit-profil-dinas.component';

describe('EditProfilDinasComponent', () => {
  let component: EditProfilDinasComponent;
  let fixture: ComponentFixture<EditProfilDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
