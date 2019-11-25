import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import * as admin from 'firebase-admin';
import * as randomProfile from 'random-profile-generator';
import { Dog } from './../dog/dog.model';
import { breeds } from './breed.mock.data';
import { IsStagingGuard } from './is-staging.guard';

@Resolver(of => Dog)
export class MockDogResolver {
  getMockDogs() {
    const dogs = [];
    for (let i = 0; i < 30; i++) {
      const profile = randomProfile.profile();
      const breed = breeds[i % breeds.length];

      const dog = {
        name: profile.firstName,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis venenatis rutrum ipsum eget iaculis. Proin fringilla tortor eu tortor pulvinar pellentesque. Cras malesuada congue mi. Nunc hendrerit vestibulum molestie. ',
        updatedAt: new Date(),
        createdAt: new Date(),
        breedId: breed.id,
        imgURL: breed.imgURL,
      } as Dog;

      dogs.push(dog);
    }

    return dogs;
  }

  pushBreedsToFirestore() {
    breeds.map(breed => {
      const id = breed.id;
      delete breed.id;
      admin
        .firestore()
        .collection('breeds')
        .doc(id)
        .create(breed);
    });
  }

  pushDogsToFirestore(dogs: Dog[]) {
    dogs.forEach(dog => {
      admin
        .firestore()
        .collection('dogs')
        .add(dog);
    });
  }

  @Mutation(returns => String)
  @UseGuards(IsStagingGuard)
  createMockDogsAndBreeds() {
    const dogs = this.getMockDogs();

    this.pushBreedsToFirestore();
    this.pushDogsToFirestore(dogs);

    return 'Created mock data.';
  }
}
