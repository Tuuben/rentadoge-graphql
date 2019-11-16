import { Module } from '@nestjs/common';
import { BreedService } from './breed.service';

@Module({
    providers: [BreedService],
    exports: [BreedService]
})
export class BreedModule { }
