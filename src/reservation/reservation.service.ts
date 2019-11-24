import { Injectable } from '@nestjs/common';
import { reservations } from '../mock-data';
import { Reservation } from './reservation.model';

@Injectable()
export class ReservationService {

    getReservationById(reservationId: string) {
        return reservations[reservationId];
    }

    createReservation(dogId: string, userId: string) {
        const resId = 'abcdefgh123'
        const reservation: Reservation = {
            id: resId,
            dogId,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        // update reservation
        reservations[resId] = reservation;
        return reservations[resId]
    }

    acceptReservationReturn(reservationId: string) {

    }
}
