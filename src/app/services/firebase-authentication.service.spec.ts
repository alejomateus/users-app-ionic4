import { TestBed } from '@angular/core/testing';

import { FirebaseAuthenticationService } from './firebase-authentication.service';

fdescribe('FirebaseAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseAuthenticationService = TestBed.get(FirebaseAuthenticationService);
    expect(service).toBeTruthy();
  });
});
