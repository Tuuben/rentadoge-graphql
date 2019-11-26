import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { combineCollectionSnapshot, combineDocument } from './../helper';
import { Booking } from './booking.model';

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
    const [userHasActiveBooking, dogIsBooked] = await Promise.all([
      this.userHasActiveBooking(userId),
      this.getIsDogBooked(dogId),
    ]);

    if (userHasActiveBooking || dogIsBooked) {
      throw new HttpException('Already booked.', HttpStatus.BAD_REQUEST);
    }

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

  async getIsDogBookedByUser(dogId: string, userId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('userId', '==', userId)
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    const activeBooking = bookings.filter(b => !!b.active)[0];

    return !!activeBooking;
  }

  async getIsDogBooked(dogId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('active', '==', true)
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    return bookings && !!bookings.length;
  }

  async userHasActiveBooking(userId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .where('active', '==', true)
      .get();

    const booking = combineCollectionSnapshot(snapshot)[0];
    return !!booking;
  }
}
