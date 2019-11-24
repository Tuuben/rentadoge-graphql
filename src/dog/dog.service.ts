import { Injectable } from '@nestjs/common';

@Injectable()
export class DogService {

    getDogById(id: string) {
        return {
            id: 'what',
            name: 'wout'
        }
    }

    getAllDogs() {
        return [
            {
                id: 'whah',
                name: 'heeeee'
            }
        ]
    }

}
