import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';

fdescribe('FirebaseService', () => {
  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (d: any) => new Promise((resolve, reject) => resolve()),
        snapshotChanges: () => {
          return null;
        }
      }),

    }),
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore }
    ]
  }));

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
});
