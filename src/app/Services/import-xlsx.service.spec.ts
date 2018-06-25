import { TestBed, inject } from '@angular/core/testing';

import { ImportXlsxService } from './import-xlsx.service';

describe('ImportXlsxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportXlsxService]
    });
  });

  it('should be created', inject([ImportXlsxService], (service: ImportXlsxService) => {
    expect(service).toBeTruthy();
  }));
});
