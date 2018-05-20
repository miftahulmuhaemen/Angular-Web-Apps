import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerandaSaComponent } from './beranda-sa.component';

describe('BerandaSaComponent', () => {
  let component: BerandaSaComponent;
  let fixture: ComponentFixture<BerandaSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerandaSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerandaSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
