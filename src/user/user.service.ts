import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(chatId: number, tgUserName: string) {
    const existingUser = await this.userModel.findOne({ chatId });
    if (existingUser) return existingUser;

    try {
      return await this.userModel.create({ chatId, tgUserName });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }

  async activateRegistrationAndSetWinId(_id: string, winId: string) {
    const user = await this.userModel.findById(_id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const existingUserWithWinId = await this.userModel.findOne({
      winId: { $exists: true, $ne: null, $eq: winId },
    });

    if (existingUserWithWinId) {
      throw new BadRequestException('User with provided win ID already exists');
    }

    try {
      return await this.userModel.findByIdAndUpdate(
        _id,
        { winId, isRegistered: true },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(
        'Failed to activate user: ' + error.message,
      );
    }
  }

  async acceptFirstDeposite(_id: string, winId: string) {
    const user = await this.userModel.findById(_id);
    if (!user) throw new BadRequestException('User not found');

    try {
      return await this.userModel.findOneAndUpdate(
        { _id, winId },
        { isFirstDeposite: true },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException('Failed to update first deposit status');
    }
  }
}
