import { TestBed } from '@angular/core/testing';

import { DirectoresService } from './directores.service';

describe('DirectoresService', () => {
  let service: DirectoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
