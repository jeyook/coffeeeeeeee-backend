import { Controller, Get, Query } from '@nestjs/common';
import { SectionService } from './section.service';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { SectionResponseDto } from './dto/section-response.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}

  @Get('/')
  async getSectionByName(
    @Query('name') sectionName: string,
  ): Promise<CommonResponseDto<SectionResponseDto>> {
    const data = await this.sectionsService.getSectionByName(sectionName);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
