import { Query, Resolver } from '@nestjs/graphql';
import { Breed } from './breed.model';
import { BreedService } from './breed.service';

@Resolver(of => Breed)
export class BreedResolver {
  constructor(private readonly breedService: BreedService) {}

  @Query(returns => [Breed], { name: 'breeds' })
  getAllBreeds() {
    return this.breedService.getAllBreeds();
  }
}
