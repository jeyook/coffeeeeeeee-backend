import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { Cafe } from '../entity/cafe.entity';
import { PlaceExceptionFilter } from 'src/filter/place-exception.filter';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('place')
@ApiTags('place')
//일단 필터 생성
@UseFilters(new PlaceExceptionFilter())
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/:placeId')
  @ApiOperation({ summary: 'getPlaceById', description: 'placeId로 해당 카페 상세내용을 가져온다' })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: {
        statusCode: 200,
        message: 'READ_SUCCESS',
        data: {
          createdAt: '2024-01-07T05:25:58.385Z',
          updatedAt: '2024-01-07T05:25:58.385Z',
          deletedAt: null,
          id: 1,
          placeId: 1,
          address: '강남구',
          name: '스타벅스',
          mapX: 11,
          mapY: 12,
          phoneNumber: '010000000',
          imageUrl: 'qewr',
          homepageUrl: 'http://www.starbucks.co.kr',
        },
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed (numeric string is expected)',
      },
    },
  })
  async getPlaceById(
    @Param('placeId', ParseIntPipe) placeId: number, //transform true
  ): Promise<CommonResponseDto<Cafe>> {
    const data = await this.placeService.getPlaceById(placeId);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
