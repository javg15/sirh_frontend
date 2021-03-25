// Automatically generated. Don't change this file manually.

export type PlantillasdocssindicatoId = number & { __flavor?: 'plantillasdocssindicato' };

export default interface Plantillasdocssindicato {
  /** Primary key. Index: plantillasdocssindicato_pkey */
  id: PlantillasdocssindicatoId;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  id_catsindicato: number;

  fechainscripcion: Date | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PlantillasdocssindicatoInitializer {
  /**
   * Default value: nextval('plantillasdocssindicato_id_seq'::regclass)
   * Primary key. Index: plantillasdocssindicato_pkey
   */
  id?: PlantillasdocssindicatoId;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  id_archivos?: number;

  id_catsindicato?: number;

  fechainscripcion?: Date;

  sexo?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
