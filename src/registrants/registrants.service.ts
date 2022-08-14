import { Injectable, NotFoundException } from '@nestjs/common';
import { Registrant } from '@prisma/client';
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

  /**
   * Get a registrant.
   * @param id The registrant id.
   * @returns The registrant.
   * @throws {NotFoundException} If the registrant is not found.
   */
  async getRegistrant(id: string): Promise<Registrant> {
    const registrant = await this.prisma.registrant.findUnique({
      where: { id },
    });
    if (!registrant) {
      throw new NotFoundException('Registrant not found');
    }
    return registrant;
  }
}
