import { Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { AuthUserData } from '../auth/decorator/auth-user-data.decorator';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { LikeService } from './like.service';
import { User } from '../entity/user.entity';

@Controller('/cafe')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @Post('/:cafeId/like')
  @UseGuards(TokenAuthGuard)
  async createLike(
    @AuthUserData() user: User,
    @Param('cafeId', ParseIntPipe) cafeId: number,
  ): Promise<CommonResponseDto<void>> {
    await this.likeService.createLike(user, cafeId);
    return CommonResponseDto.successNoContent(ResponseMessage.CREATE_SUCCESS);
  }

  @Get('/:cafeId/like')
  async getLikeCountByCafeId(
    @Param('cafeId', ParseIntPipe) cafeId: number,
  ): Promise<CommonResponseDto<number>> {
    const data = await this.likeService.getLikeCountByCafeId(cafeId);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
