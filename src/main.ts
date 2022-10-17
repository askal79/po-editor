import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('PO-editor API')
    .setDescription('endpoints collections')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs/', app, document);
  // app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(PORT, () => console.log(`server started on port - ${PORT}`));
}
start()