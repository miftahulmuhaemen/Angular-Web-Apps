import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesertaDidikSaComponent } from './peserta-didik-sa.component';

describe('PesertaDidikSaComponent', () => {
  let component: PesertaDidikSaComponent;
  let fixture: ComponentFixture<PesertaDidikSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesertaDidikSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesertaDidikSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
