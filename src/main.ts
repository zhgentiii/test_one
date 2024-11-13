import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { MongoClient } from 'mongodb';
import { session } from 'telegraf-session-mongodb';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const bot = app.get(getBotToken());

  MongoClient.connect('mongodb://localhost/casino_test', {}).then((client) => {
    const db = client.db();
    bot.use(session(db, { collectionName: 'sessions' }));
  });

  await app.listen(3000);
}
bootstrap();
