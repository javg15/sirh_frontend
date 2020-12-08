// Automatically generated. Don't change this file manually.

export default interface Log {
  operacion: string | null;

  modulo: string;

  fechahora: Date;

  idUsuariosR: number | null;

  id: number;
}

export interface LogInitializer {
  operacion?: string;

  /** Default value: ''::character varying */
  modulo?: string;

  /** Default value: CURRENT_TIMESTAMP */
  fechahora?: Date;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: nextval('log_id_seq'::regclass) */
  id?: number;
}
