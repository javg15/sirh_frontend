// Automatically generated. Don't change this file manually.

export type CatquincenaId = number & { __flavor?: 'catquincena' };

export default interface Catquincena {
  /** Primary key. Index: catquincena_pkey */
  id: CatquincenaId;

  fechainicio: Date | null;

  fechafin: Date | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CatquincenaInitializer {
  /**
   * Default value: nextval('catquincena_id_seq'::regclass)
   * Primary key. Index: catquincena_pkey
   */
  id?: CatquincenaId;

  fechainicio?: Date;

  fechafin?: Date;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
