import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Declarar PrismaService como proveedor
  exports: [PrismaService],   // Exportar PrismaService para otros módulos
})
export class PrismaModule {}
