import { Module } from '@nestjs/common';
import { MockDogResolver } from './mock.dog.resolver';

@Module({
  providers: [MockDogResolver],
})
export class MockModule {}
