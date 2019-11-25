import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './reservation.model';
import { ReservationService } from './reservation.service';

@Resolver(of => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Query(results => Reservation, { name: 'reservation' })
  async getReservation(reservationId: string) {
    return this.reservationService.getReservationById(reservationId);
  }

  @Mutation(results => Reservation)
  async createReservation(
    @Args('dogId') dogId: string,
    @Context() context: any,
  ) {
    return this.reservationService.createReservation(dogId, '123');
  }

  @Mutation(results => Reservation)
  async acceptReservationReturn(@Args('reservationId') reservationId: string) {
    return this.reservationService.acceptReservationReturn(reservationId);
  }
}
