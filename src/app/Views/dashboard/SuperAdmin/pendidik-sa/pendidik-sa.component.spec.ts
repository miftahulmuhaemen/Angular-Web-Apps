import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendidikSaComponent } from './pendidik-sa.component';

describe('PendidikSaComponent', () => {
  let component: PendidikSaComponent;
  let fixture: ComponentFixture<PendidikSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendidikSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendidikSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
