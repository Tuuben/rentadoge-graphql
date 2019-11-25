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

  /* Non queriable fields */
  breedId?: string;
}
