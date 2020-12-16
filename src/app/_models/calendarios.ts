// Automatically generated. Don't change this file manually.

export type CalendariosId = number & { __flavor?: 'calendarios' };

export default interface Calendarios {
  /** Primary key. Index: calendarios_pkey */
  id: CalendariosId;

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

export interface CalendariosInitializer {
  /**
   * Default value: nextval('t_calendarios_id_seq'::regclass)
   * Primary key. Index: calendarios_pkey
   */
  id?: CalendariosId;

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
