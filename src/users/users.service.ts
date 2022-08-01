import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddUserDataType } from './dto/add-user-data.type';
import { GetUserByIdType } from './dto/get-user-by-id.type';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verify that the email address is not already in use.
   * @param {string} email The email address to verify.
   * @throws {BadRequestException} If the email address is already in use.
   */
  async verifyNewEmail(email: string): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      select: { id: true },
    });
    if (!!user) {
      throw new BadRequestException(['Email already exists']);
    }
  }

  /**
   * Create a new user.
   * @param {AddUserDataType} data The user data.
   * @returns The id of the new user.
   * @throws {BadRequestException} If the email address is already in use, or if the role id does not exist.
   */
  async addUser(data: AddUserDataType): Promise<string> {
    const { name, email, password } = data;

    await this.verifyNewEmail(email);

    const id = nanoid(16);
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.prisma.user.create({
      data: {
        id,
        name,
        email,
        password: hashedPassword,
        // TODO: Remove `roleId` when deleted role schema.
        roleId: 'HO_OoZF9mRFPgIlh',
      },
      select: { id: true },
    });

    return result.id;
  }

  /**
   * Get a user by id.
   * @param {string} id The user id.
   * @returns The user data.
   * @throws {NotFoundException} If the user does not exist.
   */
  async getUserById(id: string): Promise<GetUserByIdType> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
