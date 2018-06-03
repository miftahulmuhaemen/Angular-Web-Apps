import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetilDinasComponent } from './detil-dinas.component';

describe('DetilDinasComponent', () => {
  let component: DetilDinasComponent;
  let fixture: ComponentFixture<DetilDinasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetilDinasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetilDinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
