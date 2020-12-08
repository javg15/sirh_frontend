// Automatically generated. Don't change this file manually.

export type PermgruposId = number & { __flavor?: 'permgrupos' };

export default interface Permgrupos {
  icode: string;

  idesc: string;

  state: string;

  idUsersR: number;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: permgrupos_pk */
  id: PermgruposId;
}

export interface PermgruposInitializer {
  /** Default value: ''::character varying */
  icode?: string;

  /** Default value: ''::character varying */
  idesc?: string;

  /** Default value: 'A'::bpchar */
  state?: string;

  /** Default value: 0 */
  idUsersR?: number;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('permgrupos_id_seq'::regclass)
   * Primary key. Index: permgrupos_pk
   */
  id?: PermgruposId;
}
