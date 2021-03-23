// Automatically generated. Don't change this file manually.

export type PlantillasdocslicenciasId = number & { __flavor?: 'plantillasdocslicencias' };

export default interface Plantillasdocslicencias {
  /** Primary key. Index: plantillasdocslicencias_pkey */
  id: PlantillasdocslicenciasId;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  folio: string;

  fechainicio: Date | null;

  fechatermino: Date | null;

  fechaingreso: Date | null;

  diagnostico: string | null;

  tipo: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PlantillasdocslicenciasInitializer {
  /**
   * Default value: nextval('plantillasdocslicencias_id_seq'::regclass)
   * Primary key. Index: plantillasdocslicencias_pkey
   */
  id?: PlantillasdocslicenciasId;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  id_archivos?: number;

  folio: string;

  fechainicio?: Date;

  fechatermino?: Date;

  fechaingreso?: Date;

  diagnostico?: string;

  tipo?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
