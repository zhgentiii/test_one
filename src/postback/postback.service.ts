import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostbackService {
  constructor(
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  async acceptRegister(userId: string, winId: string) {
    try {
      const user = await this.userService.activateRegistrationAndSetWinId(
        userId,
        winId,
      );

      this.eventEmitter.emit('user.registered', user);
    } catch (error) {
      console.log('error', error);
    }
  }

  async acceptFirstDeposite(userId: string, winId: string) {
    const user = await this.userService.acceptFirstDeposite(userId, winId);

    this.eventEmitter.emit('user.first.deposite', user);
  }
}
