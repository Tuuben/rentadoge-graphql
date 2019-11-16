import { Resolver, Query, Parent, ResolveProperty } from '@nestjs/graphql';
import { Dog } from './dog.model'
import { DogService } from './dog.service';
import { BreedService } from './../breed/breed.service';
import { Breed } from './../breed/breed.model';

@Resolver(of => Dog)
export class DogResolver {
    constructor(private readonly dogService: DogService,
        private readonly breedService: BreedService) { }

    @Query(returns => [Dog], { name: 'dogs' })
    async getDogs() {
        return this.dogService.getAllDogs();
    }

    @ResolveProperty(resolve => Breed)
    breed(@Parent() dog: Dog) {
        try {
            const { breedId } = dog;
            return this.breedService.getBreed(breedId || 'test');
        }
        catch (err) {
            console.error(err);
        }
    }

}