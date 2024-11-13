import { Controller, Get, Query } from '@nestjs/common';
import { PostbackService } from './postback.service';

interface RegisterQuery {
  sub1: string;
  winId: string;
}

@Controller('postback')
export class PostbackController {
  constructor(private readonly postbackService: PostbackService) {}

  @Get('/accept-register')
  async approveRegister(@Query() query: RegisterQuery) {
    const { winId, sub1 } = query;
    return this.postbackService.acceptRegister(sub1, winId);
  }

  @Get('/')
  async approveFirstDeposit(@Query() query: any) {
    const { winId, sub1 } = query;

    return this.postbackService.acceptFirstDeposite(sub1, winId);
  }
}
