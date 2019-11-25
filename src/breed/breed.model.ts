import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Breed {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imgURL?: string;
}
