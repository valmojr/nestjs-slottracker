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
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24,
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
    origin: '*',
    credentials: true,
  });
  await app.listen(process.env.APP_PORT);
}
bootstrap();
