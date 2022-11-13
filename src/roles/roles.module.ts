import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from '@app/roles/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from '@app/roles/roles.entity';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [TypeOrmModule.forFeature([RolesEntity])],
})
export class RolesModule {}
