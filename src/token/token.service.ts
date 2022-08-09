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
   * @param id The id that refresh token is associated with.
   * @param token The refresh token to verify.
   * @returns `true` if the refresh token is verified.
   */
  async verifyRefreshToken(id: string, token: string): Promise<boolean> {
    const auth = await this.prisma.authentications.findUnique({
      where: { id },
    });
    return auth && auth.token === token;
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
