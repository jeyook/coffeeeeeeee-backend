import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CafeResponseDto } from './dto/cafe-response.dto';

@Controller('cafe')
@ApiTags('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get('/:cafeId')
  @ApiOperation({ summary: 'getCafeById', description: 'cafeId로 해당 카페 상세내용을 가져온다' })
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
  async getCafeById(
    @Param('cafeId', ParseIntPipe) cafeId: number, //transform true
  ): Promise<CommonResponseDto<CafeResponseDto>> {
    const data = await this.cafeService.getCafeById(cafeId);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }

  async getCafeListBySectionId(
    @Param('sectionId', ParseIntPipe) sectionId: number,
  ): Promise<CommonResponseDto<CafeResponseDto[]>> {
    const data = await this.cafeService.getCafeListBySectionId(sectionId);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
