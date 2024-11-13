import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Update, Ctx, Start, Action, InjectBot } from 'nestjs-telegraf';
import { UserService } from 'src/user/user.service';
import {
  telegramTrialResponse,
  telegramWelcomeMessage,
  onSuccessPromoRegistrationMsg,
} from 'src/utils/constants';
import { Context, Telegraf } from 'telegraf';

interface MyBotContext extends Context {
  session: {
    userId?: any;
  };
}

@Update()
export class BotService {
  constructor(
    private readonly user: UserService,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  @Start()
  async start(@Ctx() ctx: MyBotContext) {
    if (!ctx.from) {
      await ctx.reply('Unable to retrieve user information. Please try again.');
      return;
    }

    const { id: chatId, username } = ctx.from;

    const res = await this.user.createUser(chatId, username);

    ctx.session.userId = res._id;

    await ctx.reply(telegramWelcomeMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'За 90000 ₽ пермаментный (вечный доступ)',
              callback_data: 'PERMAMENT',
            },
          ],
          [{ text: 'За 1 месяц 30000 ₽', callback_data: 'ONE_MONTH' }],
          [{ text: '3 дня бесплатнофо пробнова ', callback_data: 'TRIAL' }],
        ],
      },
    });
  }

  @Action('TRIAL')
  async selectedTrial(@Ctx() ctx: MyBotContext) {
    const userId = ctx.session.userId;

    await ctx.reply(telegramTrialResponse, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Регистрация',
              url: `https://1warlo.top/casino/list?open=register&p=q24u&sub1=${userId}`,
            },
          ],
        ],
      },
    });
  }

  @OnEvent('user.registered')
  onUserActivation(payload: any) {
    const { chatId } = payload;

    this.bot.telegram.sendMessage(chatId, onSuccessPromoRegistrationMsg);
  }

  @OnEvent('user.first.deposite')
  onUserFirstDeposite(payload: any) {
    const { chatId } = payload;
  }
}
