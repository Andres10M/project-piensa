// pet.controller.ts
import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express'; // Importa Request de Express
import { PetService } from './pet.service';
import { CreatePetDto } from './dto/pet.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(AuthGuard('jwt')) // Protegemos la ruta con JWT
  async create(@Body() createPetDto: CreatePetDto, @Req() req: Request) {
    const ownerId = (req.user as any)?.id; // Ahora `id` en lugar de `sub`

    console.log('🔹 Owner ID desde el token:', ownerId); // Verificar el `ownerId` que se obtiene del token

    return this.petService.createPet({ ...createPetDto, ownerId });
  }
  @Get()
  @UseGuards(AuthGuard('jwt')) // Protege esta ruta también con el guard
  async getPets(@Req() req: Request) {
    const ownerId = (req.user as any)?.id;

    console.log('🔹 Headers recibidos:', req.headers); // Verifica si el token llega en los headers
    console.log('🔹 ID del propietario desde el token:', (req.user as any)?.id);

    if (!ownerId) {
      throw new Error('No se encontró un propietario en el token');
    }

    return this.petService.getPetsByOwnerId(ownerId);
  }
}
