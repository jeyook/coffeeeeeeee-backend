import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CommonResponseDto } from 'src/common/common-response.dto';
import { ResponseMessage } from 'src/common/response-message.enum';
import { Cafe } from '../entity/cafe.entity';
import { PlaceExceptionFilter } from 'src/filter/place-exception.filter';

@Controller('place')
//일단 필터 생성
@UseFilters(new PlaceExceptionFilter())
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/:placeId')
  async getPlaceById(
    @Param('placeId', ParseIntPipe) placeId: number, //transform true
  ): Promise<CommonResponseDto<Cafe>> {
    const data = await this.placeService.getPlaceById(placeId);
    console.log('data', data);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
