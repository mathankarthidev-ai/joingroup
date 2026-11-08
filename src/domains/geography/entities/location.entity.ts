export type AdministrativeLevelType = 1 | 2 | 3 | 4;

export interface AdministrativeUnitEntity {
  id: string;
  countryId: string;
  parentId?: string | null;
  levelId: AdministrativeLevelType;
  officialCode?: string;
  name: string;
  slug: string;
  type: 'state' | 'ut' | 'district' | 'taluk' | 'village';
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  displayOrder: number;
}
