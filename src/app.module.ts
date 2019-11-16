import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { DogModule } from './dog/dog.module';
import { BreedModule } from './breed/breed.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      debug: true,
      playground: true
    }),
    DogModule,
    BreedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
