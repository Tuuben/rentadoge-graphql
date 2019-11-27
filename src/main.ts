import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

function initFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();

  app.use(helmet());

  app.enableCors();

  initFirebase();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
