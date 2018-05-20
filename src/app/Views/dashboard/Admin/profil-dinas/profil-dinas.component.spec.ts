import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDinasComponent } from './profil-dinas.component';

describe('ProfilDinasComponent', () => {
  let component: ProfilDinasComponent;
  let fixture: ComponentFixture<ProfilDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
