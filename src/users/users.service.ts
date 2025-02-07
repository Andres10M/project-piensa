import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async registerUser(data: { name: string; email: string; password: string }) {
    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Usamos los datos proporcionados correctamente
    return this.prisma.owner.create({
      data: {
        username: data.name, // Usamos 'data.name' para el campo 'username'
        password: hashedPassword, // Usamos la contraseña hasheada
        email: data.email, // Usamos 'data.email' como el email
        name: data.name, // Aseguramos que 'name' se pase correctamente desde los datos
      },
    });
  }
  
}
