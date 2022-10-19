"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RolesEntity = void 0;
var typeorm_1 = require("typeorm");
var swagger_1 = require("@nestjs/swagger");
var roles_enum_1 = require("@app/enums/roles.enum");
var RolesEntity = /** @class */ (function () {
    function RolesEntity() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique autoincrement field' }),
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], RolesEntity.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: roles_enum_1.UserRolesEnum.admin,
            description: 'User role',
            "enum": roles_enum_1.UserRolesEnum
        })
        // @Column({ type: 'enum', enum: UserRolesEnum, default: UserRolesEnum.admin })
        ,
        (0, typeorm_1.Column)()
    ], RolesEntity.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'Admin role, provide rights to add applications, admins and managers ',
            description: 'role description'
        }),
        (0, typeorm_1.Column)({ nullable: true })
    ], RolesEntity.prototype, "description");
    RolesEntity = __decorate([
        (0, typeorm_1.Entity)({ name: 'roles' })
    ], RolesEntity);
    return RolesEntity;
}());
exports.RolesEntity = RolesEntity;
