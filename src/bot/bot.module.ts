import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf/dist/telegraf.module';
import { UserModule } from 'src/user/user.module';
import { session } from 'telegraf';

@Module({
  imports: [
    UserModule,
    TelegrafModule.forRootAsync({
      useFactory() {
        return {
          token: '8132201403:AAH2xpWrnrs-A2cId5N7X_gfiweGHobFHYk',
          middlewares: [session()],
        };
      },
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
