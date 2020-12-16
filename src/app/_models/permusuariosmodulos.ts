// Automatically generated. Don't change this file manually.

export type PermusuariosmodulosId = number & { __flavor?: 'permusuariosmodulos' };

export default interface Permusuariosmodulos {
  /** Primary key. Index: permusuariosmodulos_pkey */
  id: PermusuariosmodulosId;

  idUsuarios: number;

  id_modulos: number;

  privilegios: string;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PermusuariosmodulosInitializer {
  /**
   * Default value: nextval('permusuariosmodulos_id_seq'::regclass)
   * Primary key. Index: permusuariosmodulos_pkey
   */
  id?: PermusuariosmodulosId;

  idUsuarios: number;

  id_modulos: number;

  /** Default value: 'nada'::character varying */
  privilegios?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
