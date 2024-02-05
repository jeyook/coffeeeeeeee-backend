import { ApiOperation, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export const GetCafeByIdOperation = ApiOperation({
  summary: 'getCafeById',
  description: 'cafeId로 해당 카페 상세내용을 가져온다',
});

export const GetCafeByIdResponse = ApiCreatedResponse({
  description: '성공여부',
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
        mapX: 11,
        mapY: 12,
        phoneNumber: '010000000',
        imageUrl: 'qewr',
        homepageUrl: 'http://www.starbucks.co.kr',
      },
    },
  },
});

export const ForbiddenResponse = ApiForbiddenResponse({
  schema: {
    example: {
      statusCode: 400,
      message: 'Validation failed (numeric string is expected)',
    },
  },
});
