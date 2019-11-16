import { Injectable } from '@nestjs/common';

@Injectable()
export class BreedService {

    getBreed(breedId: string) {
        return { id: 'golden-retriever', name: 'Golden Retreiever' }
    }

}
