import {
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @IsNumber()
  @IsNotEmpty()
  studentId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  text?: string;
}
