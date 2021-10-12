// Automatically generated. Don't change this file manually.

export type CatestatusquincenaId = number & { __flavor?: 'catestatusquincena' };

export default interface Catestatusquincena {
  /** Primary key. Index: catestatusquincena_pkey */
  id: CatestatusquincenaId;

  descripcion: string | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface CatestatusquincenaInitializer {
  /**
   * Default value: nextval('catestatusquincena_id_seq'::regclass)
   * Primary key. Index: catestatusquincena_pkey
   */
  id?: CatestatusquincenaId;

  descripcion?: string;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
