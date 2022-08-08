import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetAdminByIdType } from './dto/get-admin-by-id.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get an admin by id.
   * @param id The admin id.
   * @returns The admin.
   * @throws {NotFoundException} If the admin does not exist.
   */
  async getAdminById(id: string): Promise<GetAdminByIdType> {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  /**
   * Delete an admin.
   * @param id The admin id.
   * @throws {NotFoundException} If the admin does not exist.
   */
  async deleteAdmin(id: string): Promise<void> {
    await this.getAdminById(id);
    await this.prisma.admin.delete({ where: { id } });
  }

  /**
   * Verify the admin credentials.
   * @param email The admin email.
   * @param password The admin password.
   * @returns The admin id
   * @throws {UnauthorizedException} If the credentials are incorrect.
   */
  async verifyCredentials(email: string, password: string): Promise<string> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
    if (!admin) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const { id, password: hashedPassword } = admin;
    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return id;
  }
}
