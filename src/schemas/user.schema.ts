import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  winId?: string;

  @Prop({ unique: true })
  chatId: number;

  @Prop({ default: false })
  isRegistered: boolean;

  @Prop({ default: false })
  isFirstDeposite: boolean;

  @Prop()
  tgUserName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
