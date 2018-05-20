import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KependidikanComponent } from './kependidikan.component';

describe('KependidikanComponent', () => {
  let component: KependidikanComponent;
  let fixture: ComponentFixture<KependidikanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KependidikanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KependidikanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
