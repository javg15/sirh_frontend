// Automatically generated. Don't change this file manually.

export type CalendariosId = number & { __flavor?: 'calendarios' };

export default interface Calendarios {
  ejercicio: number | null;

  mes: number | null;

  capitulo: string | null;

  fuentef: number | null;

  importe: number | null;

  /** Primary key. Index: calendarios_pk */
  id: CalendariosId;
}

export interface CalendariosInitializer {
  ejercicio?: number;

  mes?: number;

  capitulo?: string;

  fuentef?: number;

  importe?: number;

  /**
   * Default value: nextval('calendarios_id_seq'::regclass)
   * Primary key. Index: calendarios_pk
   */
  id?: CalendariosId;
}
