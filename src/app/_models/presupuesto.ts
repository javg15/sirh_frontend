// Automatically generated. Don't change this file manually.

export type PresupuestoId = number & { __flavor?: 'presupuesto' };

export default interface Presupuesto {
  /** Primary key. Index: presupuesto_pkey */
  id: PresupuestoId;

  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PresupuestoInitializer {
  /**
   * Default value: nextval('presupuesto_id_seq'::regclass)
   * Primary key. Index: presupuesto_pkey
   */
  id?: PresupuestoId;

  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
