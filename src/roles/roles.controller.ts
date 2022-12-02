import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from '@app/roles/roles.service';
import { RolesEntity } from '@app/roles/roles.entity';
import { CreateRoleDto } from '@app/roles/dto/create-role.dto';
import { ValidationPipe } from '@app/shared/pipes/validation.pipe';
import { Roles } from '@app/shared/decorators/roles.decorator';
import { RolesGuard } from '@app/shared/guards/roles.guard';
// import { TypeormExceptionFilter } from '@app/shared/exception/typeorm-exception.filter';

@ApiTags('Roles')
@Roles('admin')
@UseGuards(RolesGuard)
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
  @UsePipes(ValidationPipe)
  // @UseFilters(new TypeormExceptionFilter())
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Remove user role' })
  @ApiResponse({ status: 200, type: RolesEntity })
  @Delete('/:id')
  removeRole(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.removeRole(id);
  }
}
