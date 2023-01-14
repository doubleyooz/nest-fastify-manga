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
  ValidateIf,
} from 'class-validator';

const atLeastOne = (object, value) => object.name || object.role;

export class UpdateUserRequest {
  @IsString()
  @IsNotEmpty()
  @ValidateIf(atLeastOne)
  name: string;

  @IsString()
  @IsIn(['scan', 'user'])
  @IsDefined()
  @ValidateIf(atLeastOne)
  role: string;
}
