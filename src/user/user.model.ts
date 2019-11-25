import { Booking } from 'src/booking/booking.model';
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

  @Field(type => Booking, { nullable: true })
  currentBooking?: Booking;
}
