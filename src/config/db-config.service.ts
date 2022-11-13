import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
// import { DataSourceOptions } from 'typeorm';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: this.configService.get<'aurora-mysql'>('TYPEORM_CONNECTION'),
      username: this.configService.get<string>('TYPEORM_USERNAME'),
      password: this.configService.get<string>('TYPEORM_PASSWORD'),
      database: this.configService.get<string>('TYPEORM_DATABASE'),
      port: +this.configService.get<number>('TYPEORM_PORT'),
      host: this.configService.get<string>('TYPEORM_HOST'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:
        this.configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
      migrationsRun:
        this.configService.get<string>('TYPEORM_MIGRATIONS_RUN') === 'true',
      autoLoadEntities: true,
      logging: this.configService.get<string>('TYPEORM_LOGGING') === 'true',
    };
  }
}
