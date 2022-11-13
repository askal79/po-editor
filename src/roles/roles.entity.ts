import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '@app/shared/enums/roles.enum';
import { UsersEntity } from '@app/users/users.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity({ name: 'roles' })
export class RolesEntity {
  @ApiProperty({ example: '1', description: 'Unique autoincrement field' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: UserRolesEnum.admin,
    description: 'User role',
    enum: UserRolesEnum,
  })
  // @Column({ type: 'enum', enum: UserRolesEnum, default: UserRolesEnum.admin })
  @Column({ unique: true })
  name: string;

  @ApiProperty({
    example:
      'Admin role, provide rights to add applications, admins and managers ',
    description: 'role description',
  })
  @Column({ nullable: true })
  description: string;

  // @ApiModelProperty({ type: () => UsersEntity, isArray: true })
  @OneToMany(() => UsersEntity, (user) => user)
  users?: UsersEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
