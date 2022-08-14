import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrantsService } from 'src/registrants/registrants.service';

@Injectable()
export class BranchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly registrantsService: RegistrantsService,
  ) {}
}
