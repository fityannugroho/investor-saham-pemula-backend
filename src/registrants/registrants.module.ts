import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegistrantsService } from './registrants.service';
import { RegistrantsController } from './registrants.controller';
import { FilesModule } from 'src/files/files.module';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [PrismaModule, FilesModule, TokenModule],
  providers: [RegistrantsService],
  controllers: [RegistrantsController],
  exports: [RegistrantsService],
})
export class RegistrantsModule {}
