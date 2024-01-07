import { Controller, Get, Param } from '@nestjs/common';
import { PlaceService } from './place.service';
import { CommonResponseDto } from 'src/common/common-response.dto';
import { ResponseMessage } from 'src/common/response-message.enum';
import { Cafe } from '../entity/cafe.entity';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Get('/:placeId')
  async getPlaceById(
    @Param('placeId') placeId: number, //transform true
  ): Promise<CommonResponseDto<Cafe>> {
    const data = await this.placeService.getPlaceById(placeId);
    console.log('data', data);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
