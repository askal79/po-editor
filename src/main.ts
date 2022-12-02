import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseDataFormatterInterceptor } from '@app/shared/interceptors/response-data-transform.interceptor';
import { TypeormExceptionFilter } from '@app/shared/exception/typeorm-exception.filter';
// import { ClassSerializerInterceptor } from '@nestjs/common';
// import ExcludeTransformInterceptor from '@app/shared/interceptors/exclude-transform.interceptor';
import { JwtAuthGuard } from '@app/shared/guards/jwt-auth.guard';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { AuthGuard } from '@nestjs/passport';

if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

async function start() {
  const PORT = process.env.API_PORT || 5000;
  const HOST = process.env.API_HOST || 'localhost';
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalInterceptors(new ExcludeTransformInterceptor());
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  app.useGlobalInterceptors(new ResponseDataFormatterInterceptor());

  await app.listen(PORT, HOST, () =>
    console.log(`server started on port - ${PORT}, ${HOST}`),
  );
}
start();
