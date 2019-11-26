import { Field, ObjectType } from 'type-graphql';
import { Breed } from './../breed/breed.model';

@ObjectType()
export class Dog {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgURL?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(type => Breed)
  breed?: Breed;

  @Field({ nullable: true })
  isBookedByUser?: boolean;

  @Field({ nullable: true })
  isBooked?: boolean;

  @Field({ nullable: true })
  bookingStatus: 'open' | 'booked' | 'user-booked' | 'pending-return';

  /* Non queriable fields */
  breedId?: string;
}
