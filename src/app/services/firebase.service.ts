import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  createUser(user: User) {
    return this.firestore.collection('Users').add(user);
  }

  readUsers() {
    return this.firestore.collection('Users').snapshotChanges();
  }

  updateUser(user: User, userId: number) {
    return this.firestore.doc(`Users/${userId}`).update(user);
  }

  deleteUser(userID: number) {
    return this.firestore.doc(`Users/${userID}`).delete();
  }
}
