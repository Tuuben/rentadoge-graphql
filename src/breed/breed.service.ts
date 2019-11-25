import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineDocument } from '../helper';

@Injectable()
export class BreedService {
  async getBreed(breedId: string) {
    const snapshot = await admin
      .firestore()
      .collection('breeds')
      .doc(breedId)
      .get();

    return combineDocument(snapshot);
  }
}
