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

  async endBooking(dogId: string, userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('userId', '==', userId)
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

    return !!admin
      .firestore()
      .collection('bookings')
      .doc(booking.id)
      .update(updatedData);
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

  async getBookingStatus(dogId: string, userId: string) {
    if (userId) {
      const dogBookedByUser = await this.getIsDogBookedByUser(dogId, userId);

      if (dogBookedByUser) {
        return 'user-booked';
      }
    }

    const isBooked = this.getIsDogBooked(dogId);
    if (isBooked) {
      return 'booked';
    }

    return 'open';
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
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    const activeBooking = bookings.filter(b => !!b.active)[0];

    return !!activeBooking;
  }

  private async getIsDogBooked(dogId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('dogId', '==', dogId)
      .where('active', '==', true)
      .get();

    const bookings = combineCollectionSnapshot(snapshot) as Booking[];

    return bookings && !!bookings.length;
  }
}
