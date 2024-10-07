import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password-dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const passwordHash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = passwordHash;
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByUsernameOrEmail(userIdentifier: string) {
    const user = await this.userRepository.findOne({
      where: [{ username: userIdentifier }, { email: userIdentifier }],
    });
    if (!user) {
      throw new NotFoundException(
        `User dengan username atau email ${userIdentifier} tidak ditemukan`,
      );
    }
    return user;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const user = await this.userRepository.findOneBy({
        id: changePasswordDto.userId,
      });
      if (!user) {
        return { success: false, message: 'User not found.' };
      }

      const hashedPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        10,
      );
      user.password = hashedPassword;
      await this.userRepository.save(user);

      return { success: true, message: 'Password successfully changed.' };
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: 'Failed to change password.' };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }
  async remove(id: string) {
    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(existingUser);
  }
}
