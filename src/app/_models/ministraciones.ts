// Automatically generated. Don't change this file manually.

export type MinistracionesId = number & { __flavor?: 'ministraciones' };

export default interface Ministraciones {
  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  state: string | null;

  /** Primary key. Index: ministraciones_pk */
  id: MinistracionesId;
}

export interface MinistracionesInitializer {
  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  createdAt?: Date;

  updatedAt?: Date;

  state?: string;

  /**
   * Default value: nextval('ministraciones_id_seq'::regclass)
   * Primary key. Index: ministraciones_pk
   */
  id?: MinistracionesId;
}
