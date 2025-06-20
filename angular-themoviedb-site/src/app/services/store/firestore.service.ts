import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { IMediaDetail, ItemSave } from '@/app/models/media';
import { User } from 'firebase/auth';
import { of, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  user?: User;
  constructor(private fireStore: Firestore, private auth: AuthService) {
    this.auth.user$.subscribe((value) => {
      this.user = value ?? undefined;
    });
  }

  addMedia(collName: string, data: ItemSave) {
    if (!this.user) return of(null);
    return addDoc(collection(this.fireStore, collName), {
      userId: this.user?.uid,
      data,
    });
  }
  removeMedia(collName: string, id: string, media_type: string) {
    if (!this.user) return of(null);
    const q = query(
      collection(this.fireStore, collName),
      where('userId', '==', this.user.uid),
      where('data.media.id', '==', Number(id)),
      where('data.media_type', '==', media_type)
    );
    return getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) return;
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    });
  }
  checkMedia(collName: string, id: string, media_type: string) {
    if (!this.user) return of(null);
    return collectionData(
      query(
        collection(this.fireStore, collName),
        where('userId', '==', this.user?.uid),
        where('data.media.id', '==', Number(id)),
        where('data.media_type', '==', media_type)
      )
    ).pipe(take(1));
  }
  getMedia(collName: string) {
    if (!this.user) return of(null);
    return collectionData(
      query(
        collection(this.fireStore, collName),
        where('userId', '==', this.user?.uid)
      )
    );
  }
}
