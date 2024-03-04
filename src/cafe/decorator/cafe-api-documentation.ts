import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocumentation(): MethodDecorator {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> | void => {
    return applyDecorators(...decorators[key])(target, key, descriptor);
  };
}

const decorators = {
  getCafeById: [
    ApiOperation({
      summary: 'getCafeById',
      description: 'cafeId로 해당 카페 상세내용을 가져온다',
    }),
    ApiOkResponse({
      description: '(mock) 카페 조회 성공 응답값',
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
            mapX: [11, 11],
            mapY: [12, 12],
            phoneNumber: '010000000',
            imageUrl: 'url~',
            homepageUrl: 'http://www.starbucks.co.kr',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: '(mock) id 타입 오류에 대한 응답값',
      schema: {
        example: {
          message: 'Validation failed (numeric string is expected)',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    ApiNotFoundResponse({
      description: '(mock) 존재하지 않는 카페 요청에 대한 응답값',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
};
