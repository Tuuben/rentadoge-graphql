import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineCollectionSnapshot, combineDocument } from './../helper';
import { Booking } from './booking.model';
import { NotAuthorized } from './../common/exceptions/not-authorized.exception';

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
    if (!userId) {
      throw new NotAuthorized();
    }

    const id = admin
      .firestore()
      .collection('bookings')
      .doc().id;


    const booking = {
      dogId,
      userId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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
      active: false
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

  async getIsDogBookedByUser(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('userId', '==', userId)
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    const activeBooking = bookings.filter(
      b => !b.returnedAt && !b.pendingReturn,
    )[0];

    return !!activeBooking;
  }

  async getIsDogBooked(dogId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    return (
      bookings && !!bookings.filter(b => !b.returnedAt && !b.pendingReturn)
    );
  }
}
