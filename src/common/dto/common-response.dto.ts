import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from './response-message.enum';

export class CommonResponseDto<T> {
  private statusCode: number;

  private message: string | ResponseMessage;

  private data: T | null;

  constructor(statusCode: number, message: string | ResponseMessage, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: ResponseMessage, data: T): CommonResponseDto<T> {
    const statusCode =
      message === ResponseMessage.CREATE_SUCCESS ? HttpStatus.CREATED : HttpStatus.OK;

    return new CommonResponseDto<T>(statusCode, message, data);
  }

  // TODO: data가 필요없는 응답일 때 "null" 또는 "data 프로퍼티 없이" 고민하기
  static successNoContent<T>(message: ResponseMessage): CommonResponseDto<T> {
    const statusCode =
      message === ResponseMessage.CREATE_SUCCESS ? HttpStatus.CREATED : HttpStatus.OK;

    return new CommonResponseDto<T>(statusCode, message, null);
  }
}
