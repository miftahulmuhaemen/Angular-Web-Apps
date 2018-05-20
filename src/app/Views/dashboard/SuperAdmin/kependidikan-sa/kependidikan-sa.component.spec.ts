import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KependidikanSaComponent } from './kependidikan-sa.component';

describe('KependidikanSaComponent', () => {
  let component: KependidikanSaComponent;
  let fixture: ComponentFixture<KependidikanSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KependidikanSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KependidikanSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
