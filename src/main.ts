import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS para permitir solicitudes desde el frontend
  app.enableCors({
    origin: '*', // Aquí se coloca la URL de tu frontend (puedes ajustar el puerto si es necesario)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos para las solicitudes
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos, ajusta si usas otros encabezados
    credentials: true, // Permite enviar cookies o credenciales, si es necesario
  });

  await app.listen(3000); // Backend escucha en el puerto 3000
}
bootstrap();
