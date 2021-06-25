// Automatically generated. Don't change this file manually.

export type CatnombramientosId = number & { __flavor?: 'catnombramientos' };

export default interface Catnombramientos {
  /** Primary key. Index: catnombramientos_pkey */
  id: CatnombramientosId;

  descripcion: string | null;

  abrev: string | null;

  prioridad: number | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface CatnombramientosInitializer {
  /**
   * Default value: nextval('catnombramientos_id_seq'::regclass)
   * Primary key. Index: catnombramientos_pkey
   */
  id?: CatnombramientosId;

  descripcion?: string;

  abrev?: string;

  prioridad?: number;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
