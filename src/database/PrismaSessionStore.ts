import * as session from 'express-session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaSessionStore extends session.Store {
  async get(
    sid: string,
    callback: (err?: any, session?: session.SessionData | null) => void,
  ) {
    try {
      const dbSession = await prisma.session.findUnique({
        where: { id: sid },
      });

      if (dbSession) {
        const sessionData: session.SessionData = JSON.parse(dbSession.json);
        callback(null, sessionData);
      } else {
        callback();
      }
    } catch (err) {
      callback(err);
    }
  }

  async set(
    sid: string,
    sessionData: session.SessionData,
    callback: (err?: any) => void,
  ) {
    try {
      await prisma.session.upsert({
        where: { id: sid },
        create: {
          id: sid,
          json: JSON.stringify(sessionData),
          expiredAt: new Date(sessionData.cookie.expires),
        },
        update: {
          json: JSON.stringify(sessionData),
          expiredAt: new Date(sessionData.cookie.expires),
        },
      });

      callback();
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid: string, callback: (err?: any) => void) {
    try {
      await prisma.session.delete({ where: { id: sid } });
      callback();
    } catch (err) {
      callback(err);
    }
  }
}
