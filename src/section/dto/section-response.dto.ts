import { Cafe } from '../../entity/cafe.entity';
import { Section } from '../../entity/section.entity';

interface SectionCafeDto {
  id: number;
  placeId: number;
  address: string;
  name: string;
  mapX: number;
  mapY: number;
}
export class SectionResponseDto {
  private id: number;
  private name: string;
  private geom: object;
  private cafe: SectionCafeDto[];

  constructor(section: Section) {
    this.id = section.id;
    this.name = section.name;
    this.geom = section.geom;
    this.cafe = this.mapCafeToDto(section.cafe);
  }

  private mapCafeToDto(cafes: Cafe[]): SectionCafeDto[] {
    return cafes.map((cafe) => ({
      id: cafe.id,
      placeId: cafe.placeId,
      address: cafe.address,
      name: cafe.name,
      mapX: cafe.mapX,
      mapY: cafe.mapY,
    }));
  }
}
