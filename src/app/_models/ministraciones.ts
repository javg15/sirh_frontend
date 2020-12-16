// Automatically generated. Don't change this file manually.

export type MinistracionesId = number & { __flavor?: 'ministraciones' };

export default interface Ministraciones {
  /** Primary key. Index: ministraciones_pkey */
  id: MinistracionesId;

  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  created_at: Date | null;

  updated_at: Date | null;

  state: string;

  id_usuarios_r: number | null;
}

export interface MinistracionesInitializer {
  /**
   * Default value: nextval('ministraciones_id_seq'::regclass)
   * Primary key. Index: ministraciones_pkey
   */
  id?: MinistracionesId;

  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  created_at?: Date;

  updated_at?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  id_usuarios_r?: number;
}
