import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importar PrismaModule

@Module({
  imports: [PrismaModule], // Agregar PrismaModule aquí
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
