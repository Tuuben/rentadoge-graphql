import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { NotAuthorized } from './../common/exceptions/not-authorized.exception';
import { combineCollectionSnapshot, combineDocument } from './../helper';
import { Booking } from './booking.model';

@Injectable()
export class BookingService {
  async createBooking(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const [hasActiveBooking, dogIsBooked] = await Promise.all([
      this.getUserActiveBooking(userId),
      this.getDogBooking(dogId),
    ]);

    if (hasActiveBooking || dogIsBooked) {
      throw new HttpException('Already booked.', HttpStatus.BAD_REQUEST);
    }

    const booking = {
      dogId,
      userId,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await admin
      .firestore()
      .collection('bookings')
      .add(booking);

    const dogSnapshot = await admin
      .firestore()
      .collection('dogs')
      .doc(dogId)
      .get();

    return combineDocument(dogSnapshot);
  }

  async endBooking(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('userId', '==', userId)
      .where('active', '==', true)
      .limit(1)
      .get();

    const booking = combineCollectionSnapshot(snapshot)[0] as Booking;

    if (!booking) {
      throw new HttpException('Non existant booking.', HttpStatus.NOT_FOUND);
    }

    const updatedData = {
      updatedAt: new Date(),
      pendingReturn: true,
      active: false,
    };

    await admin
      .firestore()
      .collection('bookings')
      .doc(booking.id)
      .update(updatedData);

    const dogSnapshot = await admin
      .firestore()
      .collection('dogs')
      .doc(dogId)
      .get();

    return combineDocument(dogSnapshot);
  }

  acceptBookingEnded(bookingId: string) {
    const data = {
      updatedAt: new Date(),
      returnedAt: new Date(),
      pendingReturn: false,
    };

    return !!admin
      .firestore()
      .collection('bookings')
      .doc(bookingId)
      .update(data);
  }

  async getBookingState(dogId: string, userId: string) {
    if (!userId) {
      return 'sign-in';
    }

    const [userHasBooking, dogIsBooked, dogIsBookedByUser] = await Promise.all([
      this.getUserActiveBooking(userId),
      this.getDogBooking(dogId),
      this.getIsDogBookedByUser(dogId, userId),
    ]);

    if (dogIsBookedByUser) {
      return 'return';
    }

    if (dogIsBooked) {
      return 'unavailable';
    }

    if (userHasBooking) {
      return 'other-booking';
    }

    return 'available';
  }

  async getUserActiveBooking(userId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .where('active', '==', true)
      .limit(1)
      .get();

    const booking = combineCollectionSnapshot(snapshot)[0];
    return booking;
  }

  private async getIsDogBookedByUser(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('userId', '==', userId)
      .where('active', '==', true)
      .limit(1)
      .get();

    const booking = combineCollectionSnapshot(snapshot)[0];

    return !!booking;
  }

  private async getDogBooking(dogId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('active', '==', true)
      .get();

    const booking = combineCollectionSnapshot(snapshot)[0];

    return !!booking;
  }
}
