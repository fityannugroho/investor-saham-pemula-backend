import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  /**
   * Verify the admin credentials.
   * @param email The admin email.
   * @param password The admin password.
   * @returns The admin id
   * @throws {UnauthorizedException} If the credentials are incorrect.
   */
  async validateAdmin(email: string, password: string): Promise<string> {
    return await this.adminsService.verifyCredentials(email, password);
  }

  /**
   * Login the admin.
   * @param id The admin id.
   * @returns The access token.
   */
  async loginAdmin(id: string): Promise<string> {
    const payload = { id };
    return await this.jwtService.signAsync(payload);
  }
}
