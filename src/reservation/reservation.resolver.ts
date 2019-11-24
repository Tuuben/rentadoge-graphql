import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Reservation } from "./reservation.model";
import { Injectable } from "@nestjs/common";
import { ReservationService } from "./reservation.service";

@Resolver(of => Reservation)
export class ReservationResolver {

    constructor(private readonly reservationService: ReservationService) { }

    @Query(results => Reservation, { name: 'reservation' })
    async getReservation(reservationId: string) {
        return this.reservationService.getReservationById(reservationId);
    }

    @Mutation()
    async createReservation(@Args('dogId') dogId: string) {
        return this.reservationService.createReservation(dogId, '123');
    }

    @Mutation()
    async acceptReservationReturn(@Args('reservationId') reservationId: string) {
        return this.reservationService.acceptReservationReturn(reservationId);
    }

}