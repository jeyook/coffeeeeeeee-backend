import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
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

class FilesUploadDto {
  @ApiProperty({
    description: '이미지 파일들',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  images: any[];

  @ApiProperty({
    description: '평점 (최소, 최대 안 정함)',
    example: 5,
    required: true,
  })
  rating: number;

  @ApiProperty({
    description: '내용 (최대 500자)',
    example: '소금빵이 참 맛있네요.',
    required: true,
  })
  content: string;
}

const decorators = {
  createReview: [
    ApiOperation({
      summary: 'createReview',
      description: 'Review를 생성한다.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: FilesUploadDto,
    }),
    ApiBearerAuth(),
    ApiCreatedResponse({
      description: 'Review 생성 성공 응답값',
      schema: {
        example: {
          statusCode: 201,
          message: 'CREATE_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe가 존재하지 않을 때 응답값',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
  getPaginatedReview: [
    ApiOperation({
      summary: 'getPaginatedReview',
      description: 'Review를 조회한다.',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Review 조회 성공 응답값',
      schema: {
        example: {
          statusCode: 200,
          message: 'READ_SUCCESS',
          data: {
            currentPage: 1,
            totalCount: 13,
            pageSize: 1,
            totalPage: 13,
            items: [
              {
                id: 15,
                rating: 1,
                content: 'dasdasdas222asdasda',
                isMyReview: false,
                user: {
                  id: 1,
                  nickname: 'asdsa',
                },
                images: [
                  {
                    id: 4,
                    url: 'https://coffeeeeeeee-bucket.s3.ap-northeast-2.amazonaws.com/review-images/b73a2bde5327ac18b2ee2c5e0f7f27d3-1707121016952.jpg',
                  },
                ],
              },
            ],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe가 존재하지 않을 때 응답값',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
    ApiBadRequestResponse({
      description: '페이지 범위를 초과했을 때 응답값',
      schema: {
        example: {
          message: 'PAGE_OUT_OF_RANGE',
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
  ],
  getOneReview: [
    ApiOperation({
      summary: 'getOneReview',
      description: 'Review 하나를 조회한다.',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Review 하나 조회 성공 응답값',
      schema: {
        example: {
          statusCode: 200,
          message: 'READ_SUCCESS',
          data: {
            id: 15,
            rating: 1,
            content: 'dasdasdas222asdasda',
            isMyReview: false,
            user: {
              id: 1,
              nickname: 'asdsa',
            },
            images: [
              {
                id: 4,
                url: 'https://coffeeeeeeee-bucket.s3.ap-northeast-2.amazonaws.com/review-images/b73a2bde5327ac18b2ee2c5e0f7f27d3-1707121016952.jpg',
              },
            ],
          },
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe나 Review가 존재하지 않을 때 응답값, Review 메시지는 NOT_FOUND_REVIEW',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
  updateReview: [
    ApiOperation({
      summary: 'updateReview',
      description: 'Review를 수정한다.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      type: FilesUploadDto,
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Review 수정 성공 응답값',
      schema: {
        example: {
          statusCode: 200,
          message: 'UPDATE_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe나 Review가 존재하지 않을 때 응답값, Review 메시지는 NOT_FOUND_REVIEW',
      schema: {
        example: {
          message: 'NOT_FOUND_CAFE',
          error: 'Not Found',
          statusCode: 404,
        },
      },
    }),
  ],
  deleteReview: [
    ApiOperation({
      summary: 'deleteReview',
      description: 'Review를 삭제한다.',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Review 삭제 성공 응답값',
      schema: {
        example: {
          statusCode: 200,
          message: 'DELETE_SUCCESS',
        },
      },
    }),
    ApiNotFoundResponse({
      description: 'Cafe나 Review가 존재하지 않을 때 응답값, Review 메시지는 NOT_FOUND_REVIEW',
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
