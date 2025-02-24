import { Module } from '@nestjs/common';
import { PetController } from './pet.controller'; // Importamos el controlador
import { PetService } from './pet.service'; // Importamos el servicio
import { PrismaService } from 'src/prisma/prisma.service'; // Importamos el servicio Prisma
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule], // ⬅️ Importa aquí el AuthModule
  controllers: [PetController], // Registramos el controlador
  providers: [PetService, PrismaService], // Registramos el servicio
})
export class PetModule {}
