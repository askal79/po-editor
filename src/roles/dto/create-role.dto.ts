import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { UserRolesEnum } from '@app/shared/enums/roles.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
  readonly description?: string;
}
