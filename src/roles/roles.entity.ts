import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '@app/enums/roles.enum';
import { IsEnum, IsString } from 'class-validator';

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
  @Column()
  name: string;

  @ApiProperty({
    example:
      'Admin role, provide rights to add applications, admins and managers ',
    description: 'role description',
  })
  @Column({ nullable: true })
  description: string;
}
