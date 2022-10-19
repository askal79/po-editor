"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DbConfigService = void 0;
var common_1 = require("@nestjs/common");
// import { DataSourceOptions } from 'typeorm';
var DbConfigService = /** @class */ (function () {
    function DbConfigService(configService) {
        this.configService = configService;
    }
    DbConfigService.prototype.createTypeOrmOptions = function () {
        return {
            type: this.configService.get('TYPEORM_CONNECTION'),
            username: this.configService.get('TYPEORM_USERNAME'),
            password: this.configService.get('TYPEORM_PASSWORD'),
            database: this.configService.get('TYPEORM_DATABASE'),
            port: +this.configService.get('TYPEORM_PORT'),
            host: this.configService.get('TYPEORM_HOST'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: this.configService.get('TYPEORM_SYNCHRONIZE') === 'true',
            migrationsRun: this.configService.get('TYPEORM_MIGRATIONS_RUN') === 'true',
            autoLoadEntities: true,
            logging: this.configService.get('TYPEORM_LOGGING') === 'true'
        };
    };
    DbConfigService = __decorate([
        (0, common_1.Injectable)()
    ], DbConfigService);
    return DbConfigService;
}());
exports.DbConfigService = DbConfigService;
