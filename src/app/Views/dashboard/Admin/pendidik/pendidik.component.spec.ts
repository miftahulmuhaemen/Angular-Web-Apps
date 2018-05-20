import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendidikComponent } from './pendidik.component';

describe('PendidikComponent', () => {
  let component: PendidikComponent;
  let fixture: ComponentFixture<PendidikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendidikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendidikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
