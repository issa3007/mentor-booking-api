import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMentorProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  expertise?: string;

  @IsNumber()
  hourlyRate: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
