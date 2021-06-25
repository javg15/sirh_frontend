// Automatically generated. Don't change this file manually.

export type CatestatushoraId = number & { __flavor?: 'catestatushora' };

export default interface Catestatushora {
  /** Primary key. Index: catestatushora_pkey */
  id: CatestatushoraId;

  descripcion: string | null;

  abrev: string | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface CatestatushoraInitializer {
  /**
   * Default value: nextval('catestatushora_id_seq'::regclass)
   * Primary key. Index: catestatushora_pkey
   */
  id?: CatestatushoraId;

  descripcion?: string;

  abrev?: string;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
