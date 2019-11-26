import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { UserDataInput } from './user-data-input';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { name: 'user' })
  getUser(@Context('context') { userId }) {
    return this.userService.getUser(userId);
  }

  @Mutation(returns => Boolean)
  updateUser(
    @Args('data') data: UserDataInput,
    @Context('context') { userId },
  ) {
    return this.userService.updateUser(userId, data);
  }

  @ResolveProperty()
  bookedDog(@Context('context') { userId }) {
    return this.userService.getBookedDog(userId);
  }
}
