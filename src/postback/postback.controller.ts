import { Controller, Get, Query } from '@nestjs/common';

@Controller('postback')
export class PostbackController {
  @Get('/')
  async getPostback(@Query() query: any) {
    console.log('@@@@@@@@@@@2query', query);
  }
}
