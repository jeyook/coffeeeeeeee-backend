//굳이 커스텀 안써도 될듯 일단 냅둠
import { IsInt } from 'class-validator';

export class ParamDto {
  @IsInt({ message: 'placeId는 정수여야 합니다.' })
  placeId: number;
}
