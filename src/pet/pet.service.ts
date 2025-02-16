import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePetDto } from './dto/pet.dto';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async getPetsByOwnerId(ownerId: string) {
    console.log('🔹 Buscando mascotas para ownerId:', ownerId); // Asegúrate de que 'ownerId' está correctamente recibido
    return this.prisma.pet.findMany({
      where: { ownerId: ownerId }, // Filtra las mascotas por ownerId
    });
  }
  async createPet(createPetDto: CreatePetDto) {
    const { ownerId, ...petData } = createPetDto;

    // Asegurarse de que ownerId sea un string (UUID) antes de hacer la consulta
    const ownerIdString = String(ownerId); // Convertimos ownerId a string si no lo es
    console.log('Owner ID being searched:', ownerIdString); // Verifica el valor de ownerId antes de la consulta

    // Verificar que el usuario (dueño de la mascota) existe
    const ownerExists = await this.prisma.user.findUnique({
      where: { id: ownerIdString }, // Aseguramos que estamos usando el ownerId correctamente
    });

    if (!ownerExists) {
      throw new Error('El propietario no existe');
    }
    if (!ownerIdString || ownerIdString === 'undefined') {
      throw new Error('El ownerId es inválido o no se proporcionó');
    }

    // Crear la mascota y asociarla con el ownerId
    return this.prisma.pet.create({
      data: {
        ...petData,
        ownerId: ownerIdString, // Asociamos la mascota con el dueño
      },
    });
  }
}
