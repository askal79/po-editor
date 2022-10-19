import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from '@app/roles/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '@app/roles/dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly userRepository: Repository<RolesEntity>,
  ) {}

  async getAllRoles(): Promise<RolesEntity[]> {
    const roles = await this.userRepository.find();
    return roles;
  }

  async createRole(dto: CreateRoleDto): Promise<RolesEntity> {
    const role = await this.userRepository.save(dto);
    return role;
  }
}
