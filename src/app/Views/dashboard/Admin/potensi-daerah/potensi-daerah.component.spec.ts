import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotensiDaerahComponent } from './potensi-daerah.component';

describe('PotensiDaerahComponent', () => {
  let component: PotensiDaerahComponent;
  let fixture: ComponentFixture<PotensiDaerahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotensiDaerahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotensiDaerahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
