import { Cafe } from '../../entity/cafe.entity';

export class CafeResponseDto {
  private id: number;
  private placeId: number;
  private address: string;
  private name: string;
  private mapX: number;
  private mapY: number;
  private phoneNumber: string;
  private imageUrl: string;
  private homepageUrl: string;

  constructor(cafe: Cafe) {
    this.id = cafe.id;
    this.placeId = cafe.placeId;
    this.name = cafe.name;
    this.address = cafe.address;
    this.phoneNumber = cafe.phoneNumber;
    this.imageUrl = cafe.imageUrl;
    this.homepageUrl = cafe.homepageUrl;
    this.mapX = cafe.mapX;
    this.mapY = cafe.mapY;
  }
}
