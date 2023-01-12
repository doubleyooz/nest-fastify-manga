import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends AbstractDocument {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'scan' })
  role: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ default: 0 })
  tokenVersion: number;

  @Prop({ default: '' })
  resetLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
