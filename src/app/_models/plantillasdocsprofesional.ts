// Automatically generated. Don't change this file manually.

export type PlantillasdocsprofesionalId = number & { __flavor?: 'plantillasdocsprofesional' };

export default interface Plantillasdocsprofesional {
  /** Primary key. Index: plantillasdocsgeneral_pkey */
  id: PlantillasdocsprofesionalId;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  fechaexpedicion: Date | null;

  ultimogradoestudios: number | null;

  areacarrera: number | null;

  carrera: number | null;

  estatus: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PlantillasdocsprofesionalInitializer {
  /**
   * Default value: nextval('plantillasdocsgeneral_id_seq'::regclass)
   * Primary key. Index: plantillasdocsgeneral_pkey
   */
  id?: PlantillasdocsprofesionalId;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  id_archivos?: number;

  fechaexpedicion?: Date;

  ultimogradoestudios?: number;

  areacarrera?: number;

  carrera?: number;

  estatus?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
