// Automatically generated. Don't change this file manually.

export type PermusuariosmodulosId = number & { __flavor?: 'permusuariosmodulos' };

export default interface Permusuariosmodulos {
  idUsuarios: number;

  idModulos: number;

  privilegios: string;

  idUsuariosR: number;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: permusuariosmodulos_pk */
  id: PermusuariosmodulosId;
}

export interface PermusuariosmodulosInitializer {
  idUsuarios: number;

  idModulos: number;

  /** Default value: 'nada'::character varying */
  privilegios?: string;

  /** Default value: 0 */
  idUsuariosR?: number;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('permusuariosmodulos_id_seq'::regclass)
   * Primary key. Index: permusuariosmodulos_pk
   */
  id?: PermusuariosmodulosId;
}
