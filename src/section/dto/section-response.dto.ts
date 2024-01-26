import { Section } from '../../entity/section.entity';

export class SectionResponseDto {
  private id: number;
  private name: string;
  private geom: object;

  constructor(section: Section) {
    this.id = section.id;
    this.name = section.name;
    this.geom = section.geom;
  }
}
