import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constant';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Verify the jwt token.
   * @param token The token to verify.
   * @param options The options to verify the token.
   * @returns The payload of the token.
   * @throws {Error} If the token is invalid.
   */
  async verifyJwtToken(token: string, options: JwtVerifyOptions): Promise<any> {
    try {
      return await this.jwt.verifyAsync(token, options);
    } catch (error) {
      throw new Error('Invalid JWT');
    }
  }

  /**
   * Create a new access token.
   * @param payload The payload of the token.
   * @returns The access token.
   */
  async createAccessToken(payload: any): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: jwtConstants.accessTokenKey,
      expiresIn: '60s',
    });
  }

  /**
   * Create a new refresh token.
   * @param payload The payload of the token.
   * @returns The refresh token.
   */
  async createRefreshToken(payload: any): Promise<string> {
    return await this.jwt.signAsync(payload, {
      secret: jwtConstants.refreshTokenKey,
    });
  }

  /**
   * Save the refresh token to the database.
   * @param token The refresh token to verify.
   * @param id The id that refresh token is associated with.
   * @returns `true` if the refresh token is saved successfully.
   */
  async saveRefreshToken(token: string, id: string): Promise<boolean> {
    const auth = await this.prisma.authentications.create({
      data: { id, token },
    });
    return !!auth;
  }

  /**
   * Get the refresh token from the database.
   * @param id The id that refresh token is associated with.
   * @returns The refresh token if found. Otherwise, `null`.
   */
  async getRefreshToken(id: string): Promise<string | null> {
    const auth = await this.prisma.authentications.findUnique({
      where: { id },
      select: { token: true },
    });
    return auth ? auth.token : null;
  }

  /**
   * Verify a refresh token.
   * @param refreshToken The refresh token to verify.
   * @throws {Error} If the refresh token is invalid or not exists in database.
   * @returns The payload of the token.
   */
  async verifyRefreshToken(refreshToken: string): Promise<any> {
    const payload = await this.verifyJwtToken(refreshToken, {
      secret: jwtConstants.refreshTokenKey,
    });

    const auth = await this.prisma.authentications.findUnique({
      where: { id: payload.id },
    });

    if (!auth || auth.token !== refreshToken) {
      throw new Error('Refresh token not exists');
    }

    return payload;
  }

  /**
   * Delete the refresh token from the database.
   * @param id The id that refresh token is associated with.
   * @returns `true` if the refresh token is deleted successfully.
   */
  async deleteRefreshToken(id: string): Promise<boolean> {
    const auth = await this.prisma.authentications.delete({ where: { id } });
    return !!auth;
  }
}
