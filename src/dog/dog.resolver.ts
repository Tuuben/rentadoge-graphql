import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import {} from 'type-graphql';
import { BookingService } from './../booking/booking.service';
import { Breed } from './../breed/breed.model';
import { BreedService } from './../breed/breed.service';
import { Dog } from './dog.model';
import { DogService } from './dog.service';

@Resolver(of => Dog)
export class DogResolver {
  constructor(
    private readonly dogService: DogService,
    private readonly breedService: BreedService,
    private readonly bookingService: BookingService,
  ) {}

  @Query(returns => Dog, { name: 'usersBookedDog', nullable: true })
  async getUsersBookedDog(@Context('context') { userId }) {
    return this.dogService.getUsersBookedDog(userId);
  }

  @Query(returns => Dog, { name: 'dog' })
  async getDog(@Args({ name: 'dogId', type: () => String }) dogId: string) {
    return this.dogService.getDogById(dogId);
  }

  @Query(returns => [Dog], { name: 'dogs' })
  async getDogs() {
    return this.dogService.getAllDogs();
  }

  @Query(returns => [Dog], { name: 'topRatedDogs' })
  async getTopRatedDogs() {
    return this.dogService.getTopRatedDogs();
  }

  @Mutation(returns => Dog)
  async incrementRating(
    @Args('dogId') dogId: string,
    @Context('context') { userId },
  ) {
    return this.dogService.incrementRating(dogId, userId);
  }

  @ResolveProperty(resolve => Breed)
  breed(@Parent() dog: Dog) {
    const { breedId } = dog;
    return this.breedService.getBreed(breedId);
  }

  @ResolveProperty()
  bookingStatus(@Parent() dog: Dog, @Context('context') { userId }) {
    return this.bookingService.getBookingStatus(dog.id, userId);
  }
}
