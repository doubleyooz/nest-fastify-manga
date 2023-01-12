import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IS_IN,
  IsOptional,
  IsString,
  IsIn,
  IsNumber,
  Matches,
} from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/,
  )
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsIn(['scan', 'user'])
  @IsDefined()
  @IsOptional()
  role: string;

  @Exclude()
  tokenVersion: number;

  @Exclude()
  active: boolean;

  @Exclude()
  resetLink: string;
}
