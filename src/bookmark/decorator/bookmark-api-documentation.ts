import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
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
  getPaginatedBookmark: [
    ApiOperation({
      summary: 'Get paginated bookmarks',
      description: 'Get paginated list of bookmarks for the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Paginated list of bookmarks',
      schema: {
        example: {
          message: 'READ_SUCCESS',
          statusCode: 200,
          data: {
            currentPage: 1,
            totalCount: 13,
            pageSize: 1,
            totalPage: 13,
            items: [
              {
                user: {
                  id: 1,
                  nickname: '테스트',
                  email: 'test@test.com',
                  socialId: 'test1234',
                },
                cafe: {
                  cafeId: 1,
                  placeId: 1,
                  address: '주소',
                  name: '1번카페',
                  mapX: 123,
                  mapY: 456,
                  phoneNumber: '010-1234-5678',
                  imageUrl: 'https://image.imgage',
                  homepageUrl: 'https://homepage.homepage',
                },
              },
            ],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe가 존재하지 않을 때 응답값.',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiBadRequestResponse({
      description: '페이지 범위를 초과 하였을 때 응답 값.',
      schema: {
        example: {
          message: 'PAGE_OUT_OF_RANGE',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  ],
  createBookmark: [
    ApiOperation({
      summary: 'Create a bookmark',
      description: 'Bookmark를 생성한다.',
    }),
    ApiCreatedResponse({
      description: 'Bookmark 생성 성공.',
      schema: {
        example: {
          statusCode: 201,
          message: 'CREATE_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe가 존재하지 않을 때 응답값.',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
  deleteBookmark: [
    ApiOperation({
      summary: 'Delete a bookmark',
      description: 'Bookmark를 삭제한다.',
    }),
    ApiOkResponse({
      description: 'Bookmark 삭제 성공 응답 값.',
      schema: {
        example: {
          statusCode: 200,
          message: 'DELETE_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Bookmark가 존재하지 않을 때 응답 값.',
      schema: {
        example: {
          statuscode: 404,
          error: 'Not Found',
          message: 'NOT_FOUND_BOOKMARK',
        },
      },
    }),
  ],
};

export { decorators };
