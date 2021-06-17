// Automatically generated. Don't change this file manually.

export type UsuariosZonasId = number & { __flavor?: 'usuarios_zonas' };

export default interface UsuariosZonas {
  /** Primary key. Index: modulos_zonas_pkey */
  id: UsuariosZonasId;

  id_usuarios: number;

  id_catzonageografica: number;

  state: string | null;

  created_at: Date | null;

  updated_at: Date | null;

  id_usuarios_r: number | null;
}

export interface UsuariosZonasInitializer {
  /**
   * Default value: nextval('modulos_zonas_id_seq'::regclass)
   * Primary key. Index: modulos_zonas_pkey
   */
  id?: UsuariosZonasId;

  /** Default value: 0 */
  id_usuarios?: number;

  /** Default value: 0 */
  id_catzonageografica?: number;

  state?: string;

  created_at?: Date;

  updated_at?: Date;

  id_usuarios_r?: number;
}
