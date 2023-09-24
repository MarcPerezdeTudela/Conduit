import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { userId: string }) {
    const token = req.headers['authorization'].split(' ')[1];
    const user = await this.authRepository.findOneById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.token = token;
    return user;
  }
}
