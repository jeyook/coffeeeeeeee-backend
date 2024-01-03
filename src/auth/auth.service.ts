import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/type/token-payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token);
  }

  sign(payload: TokenPayload): string {
    return this.jwtService.sign(payload);
  }
}
