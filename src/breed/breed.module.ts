import { Module } from '@nestjs/common';
import { BreedResolver } from './breed.resolver';
import { BreedService } from './breed.service';

@Module({
  providers: [BreedService, BreedResolver],
  exports: [BreedService],
})
export class BreedModule {}
