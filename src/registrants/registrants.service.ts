import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRegistrantDataType } from './dto/add-registrant-data.type';

@Injectable()
export class RegistrantsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Add new registrant.
   * @param data The registrant data.
   * @returns The registrant id.
   */
  async addRegistrant(data: AddRegistrantDataType) {
    const id = nanoid(16);
    const registrant = await this.prisma.registrant.create({
      data: { id, idCard: '', ...data },
    });
    return registrant.id;
  }
}
