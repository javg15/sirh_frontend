// Automatically generated. Don't change this file manually.

export type PlantillasdocsnombramientoId = number & { __flavor?: 'plantillasdocsnombramiento' };

export default interface Plantillasdocsnombramiento {
  /** Primary key. Index: plantillasdocsnombramiento_pkey */
  id: PlantillasdocsnombramientoId;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  fechaexpedicion: Date | null;

  id_catestatusplaza: number | null;

  id_plazas: number | null;

  fechaini: Date | null;

  fechafin: Date | null;

  id_personal_titular: number | null;

  horas: number | null;

  horasb: number | null;

  id_categorias: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_catbajamotivo: number | null;
}

export interface PlantillasdocsnombramientoInitializer {
  /**
   * Default value: nextval('plantillasdocsnombramiento_id_seq'::regclass)
   * Primary key. Index: plantillasdocsnombramiento_pkey
   */
  id?: PlantillasdocsnombramientoId;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  id_archivos?: number;

  fechaexpedicion?: Date;

  id_catestatusplaza?: number;

  id_plazas?: number;

  fechaini?: Date;

  fechafin?: Date;

  id_personal_titular?: number;

  horas?: number;

  horasb?: number;

  id_categorias?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  id_catbajamotivo?: number;
}
