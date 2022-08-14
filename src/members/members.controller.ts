import { Body, Controller, Post } from '@nestjs/common';
import { RegisterMemberPayload } from './dto/register-member.payload';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async registerMember(@Body() payload: RegisterMemberPayload) {
    const memberId = await this.membersService.addMember(payload);
    return {
      statusCode: 201,
      message: 'Member registered successfully',
      data: { memberId },
    };
  }
}
