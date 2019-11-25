import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineDocument } from './../helper';

@Injectable()
export class BookingService {
  async getBookingById(bookingId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .get();

    return combineDocument(snapshot);
  }

  async createBooking(dogId: string, userId: string) {
    const booking = {
      dogId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const id = admin
      .firestore()
      .collection('bookings')
      .doc().id;

    admin
      .firestore()
      .collection('bookings')
      .doc(id)
      .create(booking);

    return { id, ...booking };
  }

  endBooking(bookingId: string) {
    const data = {
      updatedAt: new Date(),
      pendingReturn: true,
    };

    return admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .update(data);
  }

  acceptBookingEnded(bookingId: string) {
    const data = {
      updatedAt: new Date(),
      returnedAt: new Date(),
    };

    return admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .update(data);
  }

  declineBookingEnded(bookingId: string) {
    const data = {
      updatedAt: new Date(),
      stolen: true,
    };

    return admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .update(data);
  }
}
