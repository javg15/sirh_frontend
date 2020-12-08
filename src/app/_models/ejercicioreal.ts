// Automatically generated. Don't change this file manually.

export type EjerciciorealId = number & { __flavor?: 'ejercicioreal' };

export default interface Ejercicioreal {
  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  /** Primary key. Index: ejercicioreal_pk */
  id: EjerciciorealId;
}

export interface EjerciciorealInitializer {
  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  /**
   * Default value: nextval('ejercicioreal_id_seq'::regclass)
   * Primary key. Index: ejercicioreal_pk
   */
  id?: EjerciciorealId;
}
