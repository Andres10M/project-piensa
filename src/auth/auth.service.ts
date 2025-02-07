import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  private users = []; // Lista simulada de usuarios. Reemplázala con acceso a la base de datos.

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    console.log(email + password);
    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );
    return user || null;
  }

  async login(user: any) {
    // Generar el JWT
    const payload = { email: user.email, sub: user.id }; // 'sub' es el identificador del usuario
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token, // Aquí retornamos el token generado
    };
  }

  async createUser(data: { name: string; email: string; password: string; username: string }) {
    const newUser = { id: this.users.length + 1, ...data };
    this.users.push(newUser);
    return { message: 'User registered successfully', user: newUser };
  }
}
