import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUserPayload } from './dto/add-user.payload';
import { GetUserByIdParam } from './dto/get-user-by-id.param';
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

  @Get('/:id')
  async getUserById(@Param() params: GetUserByIdParam) {
    const { id } = params;
    const { name, email } = await this.usersService.getUserById(id, {
      name: true,
      email: true,
    });
    return { id, name, email };
  }
}
