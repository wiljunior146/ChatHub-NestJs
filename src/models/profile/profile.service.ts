import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { SALT_OR_ROUNDS } from 'src/common/constants/app.constant';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Update the user's profile.
   */
  async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ): Promise<User> {
    await this.usersRepository.save({ id, ...updateProfileDto });

    return await this.usersRepository.findOne(id);
  }

  /**
   * Update the user's password.
   */
  async updatePassword(
    id: number,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<string> {
    const password = await bcrypt.hash(updatePasswordDto.newPassword, SALT_OR_ROUNDS);
    await this.usersRepository.save({ id, password });
    return 'The password has been changed successfully.';
  }
}
