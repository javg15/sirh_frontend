// Automatically generated. Don't change this file manually.

export type HorasclaseasignarId = number & { __flavor?: 'horasclaseasignar' };

export default interface Horasclaseasignar {
  /** Primary key. Index: horasclaseasignar_pkey */
  id: HorasclaseasignarId;

  id_plantillaspersonal: number | null;

  id_horasclase: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface HorasclaseasignarInitializer {
  /**
   * Default value: nextval('horasclaseasignar_id_seq'::regclass)
   * Primary key. Index: horasclaseasignar_pkey
   */
  id?: HorasclaseasignarId;

  id_plantillaspersonal?: number;

  id_horasclase?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;


  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
