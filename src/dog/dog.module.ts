import { Module } from '@nestjs/common';
import { BookingModule } from './../booking/booking.module';
import { BreedModule } from './../breed/breed.module';
import { DogResolver } from './dog.resolver';
import { DogService } from './dog.service';

@Module({
  imports: [BreedModule, BookingModule],
  providers: [DogService, DogResolver],
})
export class DogModule {}
