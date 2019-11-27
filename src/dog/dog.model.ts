import { Field, ObjectType } from 'type-graphql';
import { Breed } from './../breed/breed.model';

@ObjectType()
export class Dog {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgURL?: string;

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(type => Breed, { nullable: true })
  breed?: Breed;

  @Field({ nullable: true })
  isBookedByUser?: boolean;

  @Field({ nullable: true })
  isBooked?: boolean;

  @Field({ nullable: true })
  bookingState?: string;
  /* Non queriable fields */
  breedId?: string;
}
