import { Body, Controller, Post } from '@nestjs/common';
import { AddUserPayload } from './dto/add-user.payload';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() payload: AddUserPayload) {
    const userId = await this.usersService.addUser(payload);
    return {
      statusCode: 201,
      message: 'User created successfully',
      data: { userId },
    };
  }
}
