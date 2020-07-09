import { TestBed } from '@angular/core/testing';

import { MusiqueServiceService } from './musique-service.service';

describe('MusiqueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusiqueServiceService = TestBed.get(MusiqueServiceService);
    expect(service).toBeTruthy();
  });
});
