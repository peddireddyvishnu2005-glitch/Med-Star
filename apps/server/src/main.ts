import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security Middleware
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Global DTO Validation Pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Swagger OpenAPI Setup
  const config = new DocumentBuilder()
    .setTitle('MedStart REST API Documentation')
    .setDescription('Enterprise Hospital Discovery, Geo-routing & Administration OpenAPI Specification')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 MedStart NestJS REST Server running on port ${port}`);
  console.log(`📚 Swagger OpenAPI Documentation live at http://localhost:${port}/docs`);
}
bootstrap();
