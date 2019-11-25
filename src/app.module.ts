import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { decodeAuthTokenToId } from './auth';
import { BookingModule } from './booking/booking.module';
import { BreedModule } from './breed/breed.module';
import { DogModule } from './dog/dog.module';
import { MockModule } from './mock/mock.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true,
      context: async ({ req }) => {
        const userId = await decodeAuthTokenToId(req);

        return {
          request: req,
          context: { userId },
        };
      },
    }),
    DogModule,
    BreedModule,
    BookingModule,
    MockModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
