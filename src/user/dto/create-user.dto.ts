import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { UserType } from 'src/enums/enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  username: string;

  @IsEmail({}, { message: 'Alamat email tidak valid' })
  email: string;

  @IsNotEmpty({ message: 'Kata sandi tidak boleh kosong' })
  @MinLength(8, { message: 'Kata sandi harus memiliki minimal 8 karakter' })
  password: string;

  @IsOptional()
  isActive: boolean = true;

  @IsEnum(UserType)
  userType: UserType;
}
