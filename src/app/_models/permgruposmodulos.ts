// Automatically generated. Don't change this file manually.

export type PermgruposmodulosId = number & { __flavor?: 'permgruposmodulos' };

export default interface Permgruposmodulos {
  icode: string;

  idesc: string;

  idPermgrupos: number;

  idModulos: number;

  privilegios: string;

  state: string;

  idUsersR: number;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: permgruposmodulos_pk */
  id: PermgruposmodulosId;
}

export interface PermgruposmodulosInitializer {
  /** Default value: ''::character varying */
  icode?: string;

  /** Default value: ''::character varying */
  idesc?: string;

  /** Default value: 0 */
  idPermgrupos?: number;

  /** Default value: 0 */
  idModulos?: number;

  /** Default value: 'nada'::character varying */
  privilegios?: string;

  /** Default value: 'A'::bpchar */
  state?: string;

  /** Default value: 0 */
  idUsersR?: number;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('permgruposmodulos_id_seq'::regclass)
   * Primary key. Index: permgruposmodulos_pk
   */
  id?: PermgruposmodulosId;
}
