import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Roles('STUDENT')
  @Post()
  create(@GetUser() user: User, @Body() data: CreateReviewDto) {
    return this.reviewService.createReview(user.id, data);
  }

  @Roles('MENTOR')
  @Get('mentor')
  getForMentor(@GetUser() user: User) {
    return this.reviewService.getReviewsForMentor(user.id);
  }

  @Get(':id')
  getOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getOne(id, user.id);
  }
}
