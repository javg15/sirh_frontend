// Automatically generated. Don't change this file manually.

export type HorasclasedetalleId = number & { __flavor?: 'horasclasedetalle' };

export default interface Horasclasedetalle {
  /** Primary key. Index: horasclasedetalle_pkey */
  id: HorasclasedetalleId;

  id_horasclase: number | null;

  id_categorias: number | null;

  fecha_ini: Date | null;

  fecha_fin: Date | null;

  id_cattipohorasdocente: number | null;

  id_semestre_ini: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface HorasclasedetalleInitializer {
  /**
   * Default value: nextval('horasclasedetalle_id_seq'::regclass)
   * Primary key. Index: horasclasedetalle_pkey
   */
  id?: HorasclasedetalleId;

  id_horasclase: number;

  id_categorias?: number;

  fecha_ini?: Date;

  fecha_fin?: Date;

  id_cattipohorasdocente?: number;

  id_semestre_ini?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
