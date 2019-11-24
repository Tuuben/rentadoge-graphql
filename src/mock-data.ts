import { Dog } from "./dog/dog.model";
import { Breed } from "./breed/breed.model";

export const dogs: Dog[] = [
    {
        id: '123',
        name: 'Bobby the dogo',
        createdAt: new Date(),
        updatedAt: new Date(),
        breedId: 'golden-retriever'
    },
    {
        id: '345',
        name: 'Rudolf the dogre',
        createdAt: new Date(),
        updatedAt: new Date(),
        breedId: 'pitbull'
    },
    {
        id: '678',
        name: 'Rotsku',
        createdAt: new Date(),
        updatedAt: new Date(),
        breedId: 'rotweiler'
    },
    {
        id: '910',
        name: 'GoldenBoy',
        createdAt: new Date(),
        updatedAt: new Date(),
        breedId: 'golden-retriever'
    }
]

export const breeds: Breed[] = [
    {
        id: 'golden-retriever',
        name: 'Golden retriever',
        description: 'This breed is fluffy and kind :)'
    },
    {
        id: 'rotweiler',
        name: 'Rotweiler',
        description: 'This breed is kind but can look terrifying.'
    },
    {
        id: 'pitbull',
        name: 'Golden retriever',
        description: 'Pitbull mr worldwide'
    }
]

export const reservations = {}

export const adminRights = {

}