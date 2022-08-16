import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Registrant } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { nanoid } from 'nanoid';
import { fileConstants } from 'src/files/constant';
import { FilesService } from 'src/files/files.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddRegistrantDataType } from './dto/add-registrant-data.type';
import { UpdateRegistrantDataType } from './dto/update-registrant-data.type';

@Injectable()
export class RegistrantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * The path to the ID card directory.
   */
  protected readonly idCardPhotoDir = `${fileConstants.PRIVATE_PATH}/idcard`;

  /**
   * Verify if the registrant email is already registered.
   * @param email The registrant email.
   * @param id Pass the registrant id to verify if the email is already registered for the same registrant.
   * @throws {BadRequestException} If the registrant email already exists.
   */
  async verifyRegistrantEmail(email: string, id?: string): Promise<void> {
    const registrant = await this.prisma.registrant.findUnique({
      where: { email },
      select: { id: true },
    });

    const isSameRegistrant = id && registrant && id === registrant.id;
    if (isSameRegistrant) {
      return;
    }

    if (registrant) {
      throw new BadRequestException(['Email already exists']);
    }
  }

  /**
   * Add new registrant.
   * @param data The registrant data.
   * @returns The registrant id.
   */
  async addRegistrant(data: AddRegistrantDataType) {
    await this.verifyRegistrantEmail(data.email);

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

  /**
   * Update a registrant.
   * @param id The registrant id.
   * @param data The registrant data to update.
   * @returns The updated registrant.
   * @throws {NotFoundException} If the registrant is not found.
   * @throws {BadRequestException} If the registrant data is invalid.
   */
  async updateRegistrant(id: string, data: UpdateRegistrantDataType) {
    await this.getRegistrant(id);
    await this.verifyRegistrantEmail(data.email, id);

    return await this.prisma.registrant.update({
      where: { id },
      data,
    });
  }

  /**
   * Upload an ID card.
   * @param id The registrant id.
   * @param req The request.
   * @throws {NotFoundException} If the registrant is not found.
   * @throws {BadRequestException} If the request is invalid.
   */
  async uploadIdCard(id: string, req: FastifyRequest): Promise<void> {
    const { idCard: oldIdCardPath } = await this.getRegistrant(id);

    const idCardPath = await this.filesService.uploadFile(req, {
      destination: this.idCardPhotoDir,
      rename: (oldName) => `${id}_${Date.now()}.${oldName.split('.').pop()}`,
      allowedMimetypes: fileConstants.IMAGE_MIMETYPES,
      maxFileSize: 2 * 1024 * 1024,
    });

    if (oldIdCardPath) {
      await this.filesService.deleteFile(oldIdCardPath);
    }

    await this.prisma.registrant.update({
      where: { id },
      data: { idCard: idCardPath },
    });
  }

  /**
   * Delete a registrant.
   * @param id The registrant id.
   * @throws {NotFoundException} If the registrant is not found.
   */
  async deleteRegistrant(id: string): Promise<void> {
    await this.getRegistrant(id);
    await this.prisma.registrant.delete({ where: { id } });
  }
}
