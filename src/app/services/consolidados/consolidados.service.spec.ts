import { TestBed } from '@angular/core/testing';

import { ConsolidadosService } from './consolidados.service';

describe('ConsolidadosService', () => {
  let service: ConsolidadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolidadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
