import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Etrade")
    .setDescription("Etrade API V1 ")
    .setVersion('1.0')
    .addTag('Ecommerce')
    .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document,{
    explorer:true,
    swaggerOptions:{
      filter:true,
      showRequestDuration:true,
    }
  });

  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true
  })

  await app.listen(3000);
}
bootstrap();
