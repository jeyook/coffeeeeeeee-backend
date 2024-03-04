import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PageRequestDto {
  @ApiProperty({
    description: '페이지 번호',
    required: false,
  })
  @IsPositive()
  @IsOptional()
  readonly pageNo?: number;

  @ApiProperty({
    description: '페이지 사이즈',
    required: false,
  })
  @IsPositive()
  @IsOptional()
  readonly pageSize?: number;

  getOffset(): number {
    return ((this.pageNo ?? 1) - 1) * this.getLimit();
  }

  getLimit(): number {
    return this.pageSize ?? 10;
  }
}
