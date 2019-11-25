import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  async getUser(userId: string) {
    const user = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .get();

    return user;
  }

  updateUser(userId: string, data: any) {
    return admin
      .firestore()
      .collection('users')
      .doc(userId)
      .update(data);
  }
}
