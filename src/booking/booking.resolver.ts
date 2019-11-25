import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';

@Resolver(of => Booking)
export class BookingResolver {
  constructor(private readonly bookingService: BookingService) {}

  @Query(results => Booking, { name: 'Booking' })
  async getBooking(bookingId: string) {
    return this.bookingService.getBookingById(bookingId);
  }

  @Mutation(results => Booking)
  async createBooking(
    @Args('dogId') dogId: string,
    @Context('userId') userId: any,
  ) {
    return this.bookingService.createBooking(dogId, userId);
  }

  @Mutation(results => Boolean)
  async endBooking(@Args('bookingId') bookingId: string) {
    return this.bookingService.endBooking(bookingId);
  }

  @Mutation(results => Boolean)
  async acceptBookingEnded(@Args('bookingId') bookingId: string) {
    return this.bookingService.acceptBookingEnded(bookingId);
  }
}