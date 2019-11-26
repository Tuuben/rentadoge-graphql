import { Args, Mutation, Query, Resolver, ResolveProperty, Context } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(returns => User, { name: 'user' })
  getUser(@Context('context') { userId }) {
    return this.userService.getUser(userId);
  }

  @Mutation(returns => User)
  updateUser(@Args('data') data: any, @Context('context') { userId }) {
    return this.userService.updateUser(userId, data);
  }

  @ResolveProperty()
  bookedDog(@Context('context') { userId }) {
    return this.userService.getBookedDog(userId);
  }
}
