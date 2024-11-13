import { Module } from '@nestjs/common';
import { PostbackController } from './postback.controller';
import { PostbackService } from './postback.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [PostbackController],
  providers: [PostbackService],
})
export class PostbackModule {}
