export class PageResponseDto<T> {
  private pageSize: number;

  private totalCount: number;

  private totalPage: number;

  private items: T[];

  constructor(totalCount: number, pageSize: number, items: T[]) {
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
