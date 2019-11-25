import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { name: 'user' })
  getUser(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.userService.getUser(userId);
  }

  @Mutation(returns => User)
  updateUser(@Args('userId') userId: string, @Args('data') data: any) {
    return this.userService.updateUser(userId, data);
  }
}
