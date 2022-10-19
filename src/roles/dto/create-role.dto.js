"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateRoleDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var roles_enum_1 = require("@app/enums/roles.enum");
var class_validator_1 = require("class-validator");
var CreateRoleDto = /** @class */ (function () {
    function CreateRoleDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: roles_enum_1.UserRolesEnum.admin,
            description: 'Unique role for user',
            "enum": roles_enum_1.UserRolesEnum
        })
        // @IsEnum(UserRolesEnum, { message: 'it should one of ' })
        ,
        (0, class_validator_1.IsNotEmpty)()
    ], CreateRoleDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: 'this is role', description: 'role descritption' }),
        (0, class_validator_1.IsString)({ message: 'it should be a string' })
    ], CreateRoleDto.prototype, "description");
    return CreateRoleDto;
}());
exports.CreateRoleDto = CreateRoleDto;
