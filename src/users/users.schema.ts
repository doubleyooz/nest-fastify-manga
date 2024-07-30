import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 0 })
  tokenVersion: number;

  @Prop()
  resetLink: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ default: 'User' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
