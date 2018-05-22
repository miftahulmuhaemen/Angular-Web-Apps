import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPendidikComponent } from './edit-pendidik.component';

describe('EditPendidikComponent', () => {
  let component: EditPendidikComponent;
  let fixture: ComponentFixture<EditPendidikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPendidikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPendidikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
