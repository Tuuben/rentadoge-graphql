import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Booking {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  dogId: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field({ nullable: true })
  expiresAt?: Date;

  @Field({ nullable: true })
  pendingReturn?: boolean;

  @Field({ nullable: true })
  returnedAt?: Date;

  @Field({ nullable: true })
  stolen?: boolean;
}
