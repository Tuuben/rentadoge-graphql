import { Field, InputType } from 'type-graphql';

@InputType()
export class UserDataInput {
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
}
