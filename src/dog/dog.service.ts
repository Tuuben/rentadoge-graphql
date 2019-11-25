import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineCollectionSnapshot, combineDocument } from '../helper';

@Injectable()
export class DogService {
  async getDogById(id: string) {
    const snapshot = await admin
      .firestore()
      .collection('dogs')
      .doc(id)
      .get();

    return combineDocument(snapshot);
  }

  async getAllDogs() {
    const snapshot = await admin
      .firestore()
      .collection('dogs')
      .get();

    return combineCollectionSnapshot(snapshot);
  }
}
