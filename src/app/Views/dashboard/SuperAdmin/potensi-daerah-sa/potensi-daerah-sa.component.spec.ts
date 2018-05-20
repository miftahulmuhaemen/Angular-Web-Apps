import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotensiDaerahSaComponent } from './potensi-daerah-sa.component';

describe('PotensiDaerahSaComponent', () => {
  let component: PotensiDaerahSaComponent;
  let fixture: ComponentFixture<PotensiDaerahSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotensiDaerahSaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotensiDaerahSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
