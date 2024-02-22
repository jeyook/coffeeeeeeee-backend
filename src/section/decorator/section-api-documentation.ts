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
  getSectionByName: [
    ApiOperation({
      summary: 'getSectionByName',
      description:
        'section name으로 해당 section의 폴리곤데이터와 해당 section에 속한 카페 목록을 가져온다.',
    }),
    ApiOkResponse({
      description: '(mock) section 조회 성공 응답값',
      schema: {
        example: {
          statusCode: 200,
          message: 'READ_SUCCESS',
          data: {
            id: 1,
            name: 'hongdae',
            geom: {
              type: 'Polygon',
              coordinates: [
                [
                  [0, 0],
                  [0, 10],
                  [10, 10],
                  [10, 0],
                  [0, 0],
                ],
              ],
            },
            cafe: [
              {
                id: 1,
                placeId: 1,
                address: '홍대1번출구',
                name: '스타벅스',
                mapX: [11, 11],
                mapY: [12, 23],
              },
              {
                id: 2,
                placeId: 1,
                address: '홍대2번출구',
                name: '커피빈',
                mapX: [11, 11],
                mapY: [12, 23],
              },
            ],
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: '(mock) name 파라미터가 없을때 응답값',
      schema: {
        example: {
          message: 'NAME_PARAMETER_REQUIRED',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    ApiNotFoundResponse({
      description: '(mock) 존재하지 않는 section 요청에 대한 응답값',
      schema: {
        example: {
          message: 'NOT_FOUND_SECTION',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
};
