// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Asegúrate de que coincida con la clave que usas para firmar el JWT
    });
  }

  async validate(payload: any) {
    console.log('🔹 Payload del JWT:', payload); // Verificar el contenido del payload
    return { id: payload.sub, email: payload.email };
  }
}
