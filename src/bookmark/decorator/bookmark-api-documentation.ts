import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

export function BookmarkApiDocumentation(): MethodDecorator {
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
        },
      },
    }),
    // ApiNotFoundResponse({
    //   description: 'NOT_FOUND_CAFE',
    //   schema: {
    //     example: {
    //       error: 'Not Found',
    //       message: 'NOT_FOUND_CAFE',
    //       statusCode: 404,
    //     },
    //   },
    // }),
  ],
  createBookmark: [
    ApiOperation({
      summary: 'Create a bookmark',
      description: 'Create a new bookmark for the authenticated user.',
    }),
    ApiCreatedResponse({
      description: 'Bookmark created successfully',
      // Add your schema or examples here
    }),
    // Add more decorators as needed
  ],
  deleteBookmark: [
    ApiOperation({
      summary: 'Delete a bookmark',
      description: 'Delete a bookmark for the authenticated user.',
    }),
    ApiOkResponse({
      description: 'Bookmark deleted successfully',
      // Add your schema or examples here
    }),
    ApiNotFoundResponse({
      description: 'Bookmark not found',
      // Add your schema or examples here
    }),
    // Add more decorators as needed
  ],
};

export { decorators };
