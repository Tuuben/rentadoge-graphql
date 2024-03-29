import { Module } from '@nestjs/common';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';

@Module({
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
})
export class BookingModule {}
