import { Injectable } from '@angular/core';
import { FirebaseAuthenticationService } from './firebase-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) { }
  canActivate(): boolean {
    return this.firebaseAuthenticationService.userDetails() ? true : false;
  }
}
