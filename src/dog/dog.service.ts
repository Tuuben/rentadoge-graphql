import { Injectable } from '@nestjs/common';

@Injectable()
export class DogService {

    getAllDogs() {
        return [
            {
                id: 'whah',
                name: 'heeeee'
            }
        ]
    }

}
