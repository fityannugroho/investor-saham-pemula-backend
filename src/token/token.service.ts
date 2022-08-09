import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { jwtConstants } from './constant';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Validate the jwt token.
   * @param token The token to verify.
   * @returns The payload of the token.
   */
  async validateToken(token: string): Promise<any> {
    return await this.jwt.verifyAsync(token);
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
   * @throws If failed to save the refresh token.
   */
  async saveRefreshToken(token: string, id: string): Promise<void> {
    const auth = await this.prisma.authentications.create({
      data: { id, token },
    });
    if (!auth) {
      throw new Error('Failed to save refresh token');
    }
  }

  /**
   * Verify a refresh token.
   * @param id The id that refresh token is associated with.
   * @param token The refresh token to verify.
   * @throws If the refresh token is invalid.
   */
  async verifyRefreshToken(id: string, token: string): Promise<void> {
    const auth = await this.prisma.authentications.findUnique({
      where: { id },
    });
    if (!auth || auth.token !== token) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Delete the refresh token from the database.
   * @param id The id that refresh token is associated with.
   * @throws If failed to delete the refresh token.
   */
  async deleteRefreshToken(id: string): Promise<void> {
    const auth = await this.prisma.authentications.delete({ where: { id } });
    if (!auth) {
      throw new Error('Failed to delete refresh token');
    }
  }
}
