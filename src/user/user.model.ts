import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  streetAdress: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  postCode: string;
}
