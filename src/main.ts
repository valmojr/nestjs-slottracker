import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { PrismaSessionStore } from './database/PrismaSessionStore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const sessionStore = new PrismaSessionStore();
    app.use(
      session({
        secret: process.env.SECRET_KEY,
        resave: true,
        saveUninitialized: false,
        store: sessionStore,
      }),
    );
  } catch (error) {
    console.log(error.message);
  }
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
