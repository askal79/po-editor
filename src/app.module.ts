import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './database/config/db-config.service';
import { RolesModule } from '@app/roles/roles.module';
import { ApplicationsModule } from '@app/applications/applications.module';
import { UsersModule } from '@app/users/users.module';
// import { BaseSetupModule } from '@app/base-setup/base-setup.module';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { ResponseDataFormatterInterceptor } from '@app/shared/interceptors/response-data-transform.interceptor';
import { AuthModule } from './auth/auth.module';
// import { updateTokenMiddleware } from '@app/shared/middleware/update-token.middleware';
// import ormconfig from '@app/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // TypeOrmModule.forRoot(ormconfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (
    //     config: ConfigService,
    //   ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
    //     type: config.get<'aurora-mysql'>('TYPEORM_CONNECTION'),
    //     host: config.get<string>('DB_HOST'),
    //     username: config.get<string>('TYPEORM_USERNAME'),
    //     password: config.get<string>('TYPEORM_PASSWORD'),
    //     database: config.get<string>('TYPEORM_DATABASE'),
    //     port: config.get<number>('TYPEORM_PORT'),
    //     entities: [__dirname + './**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     // autoLoadEntities: true,
    //     logging: true,
    //   }),
    // }),
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
      inject: [DbConfigService],
    }),
    RolesModule,
    ApplicationsModule,
    UsersModule,
    // BaseSetupModule,
    AuthModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseDataFormatterInterceptor,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
  controllers: [],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(updateTokenMiddleware)
//       .exclude({ path: 'auth', method: RequestMethod.ALL }, 'auth/(.*)')
//       .forRoutes('*');
//   }
// }
