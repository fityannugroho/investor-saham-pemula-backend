import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule],
  providers: [TokenService],
})
export class TokenModule {}
