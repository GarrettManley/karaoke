import { TestBed } from '@angular/core/testing';

import { Karaoke.MediatorService } from './karaoke.mediator.service';

describe('Karaoke.MediatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Karaoke.MediatorService = TestBed.get(Karaoke.MediatorService);
    expect(service).toBeTruthy();
  });
});
