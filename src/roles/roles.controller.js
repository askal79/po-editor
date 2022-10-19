"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.RolesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var roles_entity_1 = require("@app/roles/roles.entity");
var RolesController = /** @class */ (function () {
    function RolesController(rolesService) {
        this.rolesService = rolesService;
    }
    RolesController.prototype.getAllRoles = function () {
        return this.rolesService.getAllRoles();
    };
    RolesController.prototype.createRole = function (dto) {
        return this.rolesService.createRole(dto);
    };
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Get all roles' }),
        (0, swagger_1.ApiResponse)({ status: 200, type: [roles_entity_1.RolesEntity] }),
        (0, common_1.Get)()
    ], RolesController.prototype, "getAllRoles");
    __decorate([
        (0, swagger_1.ApiOperation)({ summary: 'Create user role' }),
        (0, swagger_1.ApiResponse)({ status: 200, type: roles_entity_1.RolesEntity }),
        (0, common_1.HttpCode)(200),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], RolesController.prototype, "createRole");
    RolesController = __decorate([
        (0, swagger_1.ApiTags)('roles'),
        (0, common_1.Controller)('roles')
    ], RolesController);
    return RolesController;
}());
exports.RolesController = RolesController;
