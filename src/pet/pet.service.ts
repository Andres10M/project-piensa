import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Servicio de Prisma para interactuar con la base de datos
import { Pet } from '@prisma/client'; // Importamos el tipo Pet de Prisma

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  // Crear una nueva mascota
  async createPet(data: {
    name: string;
    breed?: string;
    age?: number;
    weight?: number;
    gender?: string;
    photo?: string;
    healthNotes?: string;
    ownerId: string;
  }): Promise<Pet> {
    return this.prisma.pet.create({
      data,
    });
  }

  // Obtener todas las mascotas
  async getAllPets(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  // Obtener una mascota por su ID
  async getPetById(id: string): Promise<Pet | null> {
    return this.prisma.pet.findUnique({
      where: { id },
    });
  }

  // Actualizar los datos de una mascota
  async updatePet(id: string, data: Partial<Pet>): Promise<Pet> {
    return this.prisma.pet.update({
      where: { id },
      data,
    });
  }

  // Eliminar una mascota
  async deletePet(id: string): Promise<Pet> {
    return this.prisma.pet.delete({
      where: { id },
    });
  }
}
