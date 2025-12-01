import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';
import { SessionStatus } from 'src/common/enums/session-status.enum';

export class CreateSessionDto {
  @IsNumber()
  @IsNotEmpty()
  mentorId: number;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @IsDateString()
  @IsNotEmpty()
  endTime: Date;

  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
