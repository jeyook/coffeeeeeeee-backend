import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CafeService } from './cafe.service';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { CafeResponseDto } from './dto/cafe-response.dto';
import { ApiDocumentation } from './decorator/cafe-api-documentation';

@Controller('cafe')
@ApiTags('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}

  @Get('/:cafeId')
  @ApiDocumentation()
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
