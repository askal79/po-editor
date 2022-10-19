import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseDataFormatterInterceptor } from '@app/interceptors/response-data-transform.interceptor';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

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
  app.useGlobalInterceptors(new ResponseDataFormatterInterceptor());

  await app.listen(PORT, () => console.log(`server started on port - ${PORT}`));
}
start();
