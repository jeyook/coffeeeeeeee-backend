import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { SectionService } from './section.service';
import { CommonResponseDto } from '../common/dto/common-response.dto';
import { ResponseMessage } from '../common/dto/response-message.enum';
import { SectionResponseDto } from './dto/section-response.dto';
import {
  ForbiddenResponse,
  GetSectionByNameOperation,
  GetSectionByNameResponse,
} from './decorator/section-swagger-decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionsService: SectionService) {}
  @Get('/')
  @GetSectionByNameResponse
  @GetSectionByNameOperation
  @ForbiddenResponse
  async getSectionByName(
    @Query('name') sectionName: string,
  ): Promise<CommonResponseDto<SectionResponseDto>> {
    if (!sectionName) {
      throw new BadRequestException('NAME_PARAMETER_REQUIRED');
    }
    const data = await this.sectionsService.getSectionByName(sectionName);
    return CommonResponseDto.success(ResponseMessage.READ_SUCCESS, data);
  }
}
