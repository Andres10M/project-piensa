import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PetModule } from './pet/pet.module'; // Importamos el módulo de Pet

@Module({
  imports: [AuthModule, UsersModule, PetModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
