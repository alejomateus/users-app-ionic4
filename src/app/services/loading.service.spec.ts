import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

fdescribe('LoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingService = TestBed.get(LoadingService);
    expect(service).toBeTruthy();
  });
});
