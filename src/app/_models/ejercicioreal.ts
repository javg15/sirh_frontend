// Automatically generated. Don't change this file manually.

export type EjerciciorealId = number & { __flavor?: 'ejercicioreal' };

export default interface Ejercicioreal {
  /** Primary key. Index: ejercicioreal_pkey */
  id: EjerciciorealId;

  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  id_usuarios_r: number | null;
}

export interface EjerciciorealInitializer {
  /**
   * Default value: nextval('ejercicioreal_id_seq'::regclass)
   * Primary key. Index: ejercicioreal_pkey
   */
  id?: EjerciciorealId;

  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  id_usuarios_r?: number;
}
