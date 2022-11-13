import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '@app/shared/enums/roles.enum';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { UsersEntity } from '@app/users/users.entity';

export class CreateRoleDto {
  @ApiProperty({
    example: UserRolesEnum.admin,
    description: 'Unique role for user',
    enum: UserRolesEnum,
  })
  @IsEnum(UserRolesEnum)
  readonly name: keyof typeof UserRolesEnum;

  @ApiProperty({ example: 'admin role', description: 'role descritption' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  // @ApiProperty({ example: ['1'], description: 'connected users' })
  // @IsArray()
  // readonly users?: UsersEntity[];
}
