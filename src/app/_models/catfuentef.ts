// Automatically generated. Don't change this file manually.

export type CatfuentefId = number & { __flavor?: 'catfuentef' };

export default interface Catfuentef {
  /** Primary key. Index: catfuentef_pkey */
  id: CatfuentefId;

  nombre: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CatfuentefInitializer {
  /**
   * Default value: nextval('catfuentef_id_seq'::regclass)
   * Primary key. Index: catfuentef_pkey
   */
  id?: CatfuentefId;

  nombre?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
