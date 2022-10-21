import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseDataFormatterInterceptor } from '@app/shared/interceptors/response-data-transform.interceptor';
import { TypeormExceptionFilter } from '@app/shared/exception/typeorm-exception.filter';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('PO-editor API')
    .setDescription(
      'PO editor project is purposed to simplify the process of adding translation into existing multilingual applications',
    )
    .addBearerAuth()
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs/', app, document);
  app.useGlobalFilters(new TypeormExceptionFilter());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseDataFormatterInterceptor());

  await app.listen(PORT, () => console.log(`server started on port - ${PORT}`));
}
start();
