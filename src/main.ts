import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { PrismaSessionStore } from './database/PrismaSessionStore';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const sessionStore = new PrismaSessionStore();

    const sessionOptions = {
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        httpOnly: false,
        maxAge: 60 * 60 * 60,
        path: '/',
        sameSite: false,
      },
    };

    app.use(session(sessionOptions));
  } catch (error) {
    console.log(error.message);
  }
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:80', 'http://localhost:8080'],
    credentials: true,
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
