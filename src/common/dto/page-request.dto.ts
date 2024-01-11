import { IsNumberString, IsOptional } from 'class-validator';

export class PageRequestDto {
  @IsNumberString()
  @IsOptional()
  readonly pageNo?: number;

  @IsNumberString()
  @IsOptional()
  readonly pageSize?: number;

  getOffset(): number {
    return ((this.pageNo && this.pageNo > 0 ? Number(this.pageNo) : 1) - 1) * this.getLimit();
  }

  getLimit(): number {
    return this.pageSize ? Number(this.pageSize) : 10;
  }
}
