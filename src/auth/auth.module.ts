import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [AdminsModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
