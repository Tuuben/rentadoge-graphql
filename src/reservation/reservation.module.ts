import { Module } from '@nestjs/common';
import { ReservationResolver } from './reservation.resolver';
import { ReservationService } from './reservation.service';

@Module({
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
