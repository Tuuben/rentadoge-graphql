import {
  Args,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { Breed } from './../breed/breed.model';
import { BreedService } from './../breed/breed.service';
import { Dog } from './dog.model';
import { DogService } from './dog.service';
@Resolver(of => Dog)
export class DogResolver {
  constructor(
    private readonly dogService: DogService,
    private readonly breedService: BreedService,
  ) {}

  @Query(returns => Dog, { name: 'dog' })
  async getDog(@Args({ name: 'id', type: () => String }) id: string) {
    return this.dogService.getDogById(id);
  }

  @Query(returns => [Dog], { name: 'dogs' })
  async getDogs() {
    return this.dogService.getAllDogs();
  }

  @ResolveProperty(resolve => Breed)
  breed(@Parent() dog: Dog) {
    const { breedId } = dog;
    return this.breedService.getBreed(breedId);
  }
}
