import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PetService } from './pet.service'; // Importamos el servicio PetService
import { Pet } from '@prisma/client'; // Importamos el tipo Pet de Prisma

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  // Crear una nueva mascota
  @Post()
  async createPet(@Body() createPetDto: any): Promise<Pet> {
    return this.petService.createPet(createPetDto);
  }

  // Obtener todas las mascotas
  @Get()
  async getAllPets(): Promise<Pet[]> {
    return this.petService.getAllPets();
  }

  // Obtener una mascota por su ID
  @Get(':id')
  async getPetById(@Param('id') id: string): Promise<Pet | null> {
    return this.petService.getPetById(id);
  }

  // Actualizar los datos de una mascota
  @Put(':id')
  async updatePet(
    @Param('id') id: string,
    @Body() updatePetDto: any,
  ): Promise<Pet> {
    return this.petService.updatePet(id, updatePetDto);
  }

  // Eliminar una mascota
  @Delete(':id')
  async deletePet(@Param('id') id: string): Promise<Pet> {
    return this.petService.deletePet(id);
  }
}
