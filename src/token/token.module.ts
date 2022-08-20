import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule, PrismaModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
