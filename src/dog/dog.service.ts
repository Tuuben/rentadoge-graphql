import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineCollectionSnapshot, combineDocument } from '../helper';
import { Booking } from './../booking/booking.model';
import { Dog } from './dog.model';

@Injectable()
export class DogService {
  async getUsersBookedDog(userId: string) {
    if (!userId) {
      return undefined;
    }

    const bookingSnapshot = await admin
      .firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .where('active', '==', true)
      .limit(1)
      .get();

    const booking = combineCollectionSnapshot(bookingSnapshot)[0] as Booking;

    if (!booking) {
      return undefined;
    }

    const { dogId } = booking;

    const dogSnapshot = await admin
      .firestore()
      .collection('dogs')
      .doc(dogId)
      .get();

    return combineDocument(dogSnapshot) as Dog;
  }

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
