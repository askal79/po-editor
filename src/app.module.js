"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var typeorm_1 = require("@nestjs/typeorm");
var db_config_service_1 = require("./config/db-config.service");
var roles_module_1 = require("@app/roles/roles.module");
// import ormconfig from '@app/ormconfig';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: ".".concat(process.env.NODE_ENV, ".env")
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
                typeorm_1.TypeOrmModule.forRootAsync({
                    useClass: db_config_service_1.DbConfigService,
                    inject: [db_config_service_1.DbConfigService]
                }),
                roles_module_1.RolesModule,
            ],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
