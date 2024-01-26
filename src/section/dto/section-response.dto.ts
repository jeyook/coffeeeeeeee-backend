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

  private mapCafeToDto(cafe: Cafe[]): SectionCafeDto[] {
    return cafe.map((c) => ({
      id: c.id,
      placeId: c.placeId,
      address: c.address,
      name: c.name,
      mapX: c.mapX,
      mapY: c.mapY,
    }));
  }
}
