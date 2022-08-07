import { TestBed } from '@angular/core/testing';

import { OrtfService } from './ortf.service';

describe('OrtfService', () => {
  let service: OrtfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrtfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
