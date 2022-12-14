import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from '@app/roles/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '@app/roles/dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async getAllRoles(): Promise<RolesEntity[]> {
    const roles = await this.rolesRepository.find();
    return roles;
  }

  async createRole(dto: CreateRoleDto): Promise<RolesEntity> {
    const role = await this.rolesRepository.save(dto);
    return role;
  }

  async removeRole(id: number): Promise<any> {
    const role = await this.rolesRepository.findOne({
      select: [],
      where: { id: id },
    });
    if (!role) {
      throw new NotFoundException("Not found. Roles doesn't exist");
    }
    await this.rolesRepository.delete(id);
    return role;
  }
}
