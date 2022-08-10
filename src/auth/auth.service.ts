import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Login the admin.
   * @param email The admin email.
   * @param password The admin password.
   * @returns The access token and the refresh token.
   * @throws {UnauthorizedException} If the credentials are incorrect.
   */
  async loginAdmin(email: string, password: string) {
    const adminId = await this.adminsService.verifyCredentials(email, password);
    const accessToken = await this.tokenService.createAccessToken({ adminId });

    // Delete the refresh token if it exists.
    if (await this.tokenService.getRefreshToken(adminId)) {
      await this.tokenService.deleteRefreshToken(adminId);
    }

    const refreshToken = await this.tokenService.createRefreshToken({
      adminId,
    });
    await this.tokenService.saveRefreshToken(refreshToken, adminId);

    return { accessToken, refreshToken };
  }

  /**
   * Update the access token.
   * @param refreshToken The refresh token.
   * @returns The access token.
   * @throws {UnauthorizedException} If the refresh token is invalid.
   */
  async updateAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);
      return await this.tokenService.createAccessToken({ id: payload.id });
    } catch (error) {
      throw new BadRequestException(['Invalid refresh token']);
    }
  }
}
