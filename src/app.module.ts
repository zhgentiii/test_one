import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { PostbackModule } from './postback/postback.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7633330549:AAHNkcpL0BiKVccxxSj6kDPcN1gmB0eLjxQ',
    }),
    PostbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
