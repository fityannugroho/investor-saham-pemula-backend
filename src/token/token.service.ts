import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

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
}
