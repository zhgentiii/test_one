import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsOptional()
  winId: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
