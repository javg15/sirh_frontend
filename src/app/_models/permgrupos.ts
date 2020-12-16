// Automatically generated. Don't change this file manually.

export type PermgruposId = number & { __flavor?: 'permgrupos' };

export default interface Permgrupos {
  /** Primary key. Index: permgrupos_pkey */
  id: PermgruposId;

  icode: string;

  idesc: string;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PermgruposInitializer {
  /**
   * Default value: nextval('permgrupos_id_seq'::regclass)
   * Primary key. Index: permgrupos_pkey
   */
  id?: PermgruposId;

  /** Default value: ''::character varying */
  icode?: string;

  /** Default value: ''::character varying */
  idesc?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
