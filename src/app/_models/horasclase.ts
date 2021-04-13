// Automatically generated. Don't change this file manually.

export type HorasclaseId = number & { __flavor?: 'horasclase' };

export default interface Horasclase {
  /** Primary key. Index: horasclase_pkey */
  id: HorasclaseId;

  id_catplanteles: number | null;

  id_materiasclase: number | null;

  horas: number | null;

  horaestatus: number | null;

  id_gruposclase: number | null;

  id_semestre_ini: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  frenteagrupo: number | null;

  id_cattipohorasdocente: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface HorasclaseInitializer {
  /**
   * Default value: nextval('horasclase_id_seq'::regclass)
   * Primary key. Index: horasclase_pkey
   */
  id?: HorasclaseId;

  id_catplanteles?: number;

  id_materiasclase?: number;

  horas?: number;

  horaestatus?: number;

  id_gruposclase?: number;

  id_semestre_ini?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  id_cattipohorasdocente?: number;

  frenteagrupo?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
