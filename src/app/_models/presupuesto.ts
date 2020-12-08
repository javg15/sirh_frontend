// Automatically generated. Don't change this file manually.

export type PresupuestoId = number & { __flavor?: 'presupuesto' };

export default interface Presupuesto {
  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: presupuesto_pk */
  id: PresupuestoId;
}

export interface PresupuestoInitializer {
  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('presupuesto_id_seq'::regclass)
   * Primary key. Index: presupuesto_pk
   */
  id?: PresupuestoId;
}
