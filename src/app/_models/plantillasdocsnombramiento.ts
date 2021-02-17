// Automatically generated. Don't change this file manually.

export type PlantillasdocsnombramientoId = number & { __flavor?: 'plantillasdocsnombramiento' };

export default interface Plantillasdocsnombramiento {
  /** Primary key. Index: plantillasdocsnombramiento_pkey */
  id: PlantillasdocsnombramientoId;

  idPlantillaspersonal: number;

  idArchivos: number | null;

  fechaexpedicion: Date | null;

  tipo: number | null;

  fechaini: Date | null;

  fechafin: Date | null;

  idPersonalTitular: number | null;

  horas: number | null;

  idCategorias: number | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface PlantillasdocsnombramientoInitializer {
  /**
   * Default value: nextval('plantillasdocsnombramiento_id_seq'::regclass)
   * Primary key. Index: plantillasdocsnombramiento_pkey
   */
  id?: PlantillasdocsnombramientoId;

  /** Default value: 0 */
  idPlantillaspersonal?: number;

  idArchivos?: number;

  fechaexpedicion?: Date;

  tipo?: number;

  fechaini?: Date;

  fechafin?: Date;

  idPersonalTitular?: number;

  horas?: number;

  idCategorias?: number;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
