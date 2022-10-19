import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from '@app/roles/roles.service';
import { RolesEntity } from '@app/roles/roles.entity';
import { CreateRoleDto } from '@app/roles/dto/create-role.dto';
import { UserRolesEnum } from '@app/enums/roles.enum';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [RolesEntity] })
  @Get()
  getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @ApiOperation({ summary: 'Create user role' })
  @ApiResponse({ status: 200, type: RolesEntity })
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }
}
