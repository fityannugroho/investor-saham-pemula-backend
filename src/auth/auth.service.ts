import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private readonly tokenService: TokenService,
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
    return await this.tokenService.createAccessToken(payload);
  }
}
