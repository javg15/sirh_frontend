// Automatically generated. Don't change this file manually.

export type PlantillasdocsprofesionalId = number & { __flavor?: 'plantillasdocsprofesional' };

export default interface Plantillasdocsprofesional {
  /** Primary key. Index: plantillasdocsgeneral_pkey */
  id: PlantillasdocsprofesionalId;

  idPlantillaspersonal: number;

  idArchivos: number | null;

  fechaexpedicion: Date | null;

  ultimogradoestudios: number | null;

  areacarrera: number | null;

  carrera: number | null;

  estatus: number | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface PlantillasdocsprofesionalInitializer {
  /**
   * Default value: nextval('plantillasdocsgeneral_id_seq'::regclass)
   * Primary key. Index: plantillasdocsgeneral_pkey
   */
  id?: PlantillasdocsprofesionalId;

  /** Default value: 0 */
  idPlantillaspersonal?: number;

  idArchivos?: number;

  fechaexpedicion?: Date;

  ultimogradoestudios?: number;

  areacarrera?: number;

  carrera?: number;

  estatus?: number;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
