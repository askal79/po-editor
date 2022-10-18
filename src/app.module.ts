import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from '../config/db-config.service';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
