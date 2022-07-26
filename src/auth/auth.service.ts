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
    const payload = { id: adminId };

    const accessToken = await this.tokenService.createAccessToken(payload);

    // Delete the refresh token if it exists.
    if (await this.tokenService.getRefreshToken(adminId)) {
      await this.tokenService.deleteRefreshToken(adminId);
    }

    const refreshToken = await this.tokenService.createRefreshToken(payload);
    await this.tokenService.saveRefreshToken(refreshToken, adminId);

    return { accessToken, refreshToken };
  }

  /**
   * Get the admin profile.
   * @param id The access token.
   * @returns The admin.
   * @throws {NotFoundException} If the admin is not found.
   */
  async getAdminProfile(id: string) {
    return await this.adminsService.getAdminById(id);
  }

  /**
   * Update the access token.
   * @param refreshToken The refresh token.
   * @returns The access token.
   * @throws {BadRequestException} If the refresh token is invalid.
   */
  async updateAccessToken(refreshToken: string): Promise<string> {
    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);
      return await this.tokenService.createAccessToken({ id: payload.id });
    } catch (error) {
      throw new BadRequestException(['Invalid refresh token']);
    }
  }

  /**
   * Logout the admin.
   * @param refreshToken The refresh token.
   * @throws {BadRequestException} If the refresh token is invalid.
   */
  async logoutAdmin(refreshToken: string) {
    try {
      const payload = await this.tokenService.verifyRefreshToken(refreshToken);
      await this.tokenService.deleteRefreshToken(payload.id);
    } catch (error) {
      throw new BadRequestException(['Invalid refresh token']);
    }
  }
}
