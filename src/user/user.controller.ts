import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password-dto';

@Controller('api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(changePasswordDto);
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
