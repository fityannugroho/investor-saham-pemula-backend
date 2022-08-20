import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RegistrantsModule } from 'src/registrants/registrants.module';

@Module({
  imports: [PrismaModule, RegistrantsModule],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
