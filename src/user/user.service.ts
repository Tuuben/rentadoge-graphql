import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Booking } from './../booking/booking.model';
import { NotAuthorized } from './../common/exceptions/not-authorized.exception';
import { combineCollectionSnapshot, combineDocument } from './../helper';
import { User } from './user.model';

@Injectable()
export class UserService {
  async getUser(userId: string) {
    if (!userId) {
      throw new NotAuthorized();
    }

    const user = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    return user;
  }

  updateUser(userId: string, data: any) {
    if (!userId) {
      throw new NotAuthorized();
    }

    if (!data) {
      return undefined;
    }

    const updatedUser = this.userFactory(data);

    return admin
      .firestore()
      .collection('users')
      .doc(userId)
      .set(updatedUser);
  }

  userFactory(data: any): User {
    return {
      name: data.name || null,
      streetAdress: data.streetAdress || null,
      city: data.city || null,
      postCode: data.postCode || null,
      country: data.country || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getBookedDog(userId: string) {
    const booking = await this.getActiveBooking(userId);

    if (!booking) {
      return undefined;
    }

    const { dogId } = booking;

    const bookedDog = await this.getDog(dogId);

    return bookedDog;
  }

  async getActiveBooking(userId: string) {
    const snapshot = await admin
      .firestore()
      .collection('bookings')
      .where('userId', '==', userId)
      .where('active', '==', true)
      .get();

    return combineCollectionSnapshot(snapshot)[0] as Booking;
  }

  async getDog(dogId: string) {
    const snapshot = await admin
      .firestore()
      .collection('dogs')
      .doc(dogId)
      .get();

    return combineDocument(snapshot) as Booking;
  }
}
