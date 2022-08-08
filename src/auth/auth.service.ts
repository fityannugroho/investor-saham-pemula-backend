import { Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService {
  constructor(private adminsService: AdminsService) {}

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
}
