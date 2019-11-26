import { Field, ObjectType } from 'type-graphql';
import { Dog } from 'src/dog/dog.model';

@ObjectType()
export class User {
  @Field()
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  streetAdress?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  postCode?: string;

  @Field({ nullable: true })
  country?: string;

  @Field(type => Dog, { nullable: true })
  bookedDog?: Dog;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
