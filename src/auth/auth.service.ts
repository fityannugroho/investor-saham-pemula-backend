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
   * @returns The access token and the refresh token.
   */
  async loginAdmin(id: string) {
    const payload = { id };
    const accessToken = await this.tokenService.createAccessToken(payload);

    // Delete the refresh token if it exists.
    if (await this.tokenService.getRefreshToken(id)) {
      await this.tokenService.deleteRefreshToken(id);
    }

    const refreshToken = await this.tokenService.createRefreshToken(payload);
    await this.tokenService.saveRefreshToken(refreshToken, id);

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
