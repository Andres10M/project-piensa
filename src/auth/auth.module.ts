import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // 👈 Importa PrismaModule

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    PrismaModule, // 👈 Agrega PrismaModule aquí para que PrismaService esté disponible
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
