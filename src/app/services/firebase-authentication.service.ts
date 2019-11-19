import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Login } from '../login/login.page';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthenticationService {
  constructor(
  ) { }
  loginUser(value: Login) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            console.log('LOG Out');
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    });
  }
  userDetails() {
    return firebase.auth().currentUser;
  }
}
