import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogResolver } from './dog.resolver';
import { BreedModule } from './../breed/breed.module';

@Module({
  imports: [BreedModule],
  providers: [DogService, DogResolver]
})
export class DogModule { }
