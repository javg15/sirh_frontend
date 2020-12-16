// Automatically generated. Don't change this file manually.

export type LogId = number & { __flavor?: 'log' };

export default interface Log {
  operacion: string | null;

  modulo: string;

  fechahora: Date;

  id_usuarios_r: number | null;

  /** Primary key. Index: log_pkey */
  id: LogId;
}

export interface LogInitializer {
  operacion?: string;

  /** Default value: ''::character varying */
  modulo?: string;

  /** Default value: CURRENT_TIMESTAMP */
  fechahora?: Date;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /**
   * Default value: nextval('log_id_seq'::regclass)
   * Primary key. Index: log_pkey
   */
  id?: LogId;
}
