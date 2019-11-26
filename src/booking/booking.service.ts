import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotAuthorized } from './../common/exceptions/not-authorized.exception';
import { combineCollectionSnapshot } from './../helper';
import { Booking } from './booking.model';

@Injectable()
export class BookingService {
  async createBooking(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const [userHasActiveBooking, dogIsBooked] = await Promise.all([
      this.userHasActiveBooking(userId),
      this.getIsDogBooked(dogId),
    ]);

    if (userHasActiveBooking || dogIsBooked) {
      throw new HttpException('Already booked.', HttpStatus.BAD_REQUEST);
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
      active: false,
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
