import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Enable CORS
  app.enableCors();

  // Validate all endpoints
  app.useGlobalPipes(new ValidationPipe());

  // Render the API documentation
  const swaggerDoc = JSON.parse(fs.readFileSync('api.json').toString());
  SwaggerModule.setup('docs', app, swaggerDoc);

  // Start the server
  const host = process.env.HOST || '0.0.0.0';
  const port = process.env.PORT || 3000;

  await app.listen(port, host);
  console.log(`Server listening on ${await app.getUrl()}.`);
}
bootstrap();
