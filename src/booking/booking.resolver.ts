import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Dog } from './../dog/dog.model';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Resolver(of => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Mutation(results => Dog)
  async createBooking(
    @Args('dogId') dogId: string,
    @Context('context') { userId }: any,
  ) {
    return this.bookingService.createBooking(dogId, userId);
  }

  @Mutation(results => Dog)
  async endBooking(
    @Args('dogId') dogId: string,
    @Context('context') { userId },
  ) {
    return this.bookingService.endBooking(dogId, userId);
  }

  @Mutation(results => Boolean)
  async acceptBookingEnded(@Args('bookingId') bookingId: string) {
    return this.bookingService.acceptBookingEnded(bookingId);
  }
}
