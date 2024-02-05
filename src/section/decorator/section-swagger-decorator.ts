import { ApiOperation, ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export const GetSectionByNameOperation = ApiOperation({
  summary: 'getSectionByName',
  description: 'sectionName으로 해당 section과 속해 있는 카페목록을 가져온다.',
});

export const GetSectionByNameResponse = ApiCreatedResponse({
  description: '성공여부',
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
            mapX: 11,
            mapY: 12,
          },
          {
            id: 2,
            placeId: 1,
            address: '홍대2번출구',
            name: '커피빈',
            mapX: 11,
            mapY: 12,
          },
        ],
      },
    },
  },
});

export const ForbiddenResponse = ApiForbiddenResponse({
  schema: {
    example: {
      statusCode: 400,
      message: 'NAME_PARAMETER_REQUIRED',
    },
  },
});
