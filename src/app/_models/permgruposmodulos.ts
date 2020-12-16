// Automatically generated. Don't change this file manually.

export type PermgruposmodulosId = number & { __flavor?: 'permgruposmodulos' };

export default interface Permgruposmodulos {
  /** Primary key. Index: permgruposmodulos_pkey */
  id: PermgruposmodulosId;

  icode: string;

  idesc: string;

  id_permgrupos: number;

  id_modulos: number;

  privilegios: string;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PermgruposmodulosInitializer {
  /**
   * Default value: nextval('permgruposmodulos_id_seq'::regclass)
   * Primary key. Index: permgruposmodulos_pkey
   */
  id?: PermgruposmodulosId;

  /** Default value: ''::character varying */
  icode?: string;

  /** Default value: ''::character varying */
  idesc?: string;

  /** Default value: 0 */
  id_permgrupos?: number;

  /** Default value: 0 */
  id_modulos?: number;

  /** Default value: 'nada'::character varying */
  privilegios?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
