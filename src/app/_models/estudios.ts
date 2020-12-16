// Automatically generated. Don't change this file manually.

export type EstudiosId = number & { __flavor?: 'estudios' };

export default interface Estudios {
  /** Primary key. Index: estudios_pkey */
  id: EstudiosId;

  numemp: string | null;

  desccarrera: string | null;

  descnivel: string | null;

  titulado: string | null;

  created_at: Date | null;

  updated_at: Date | null;

  state: string;

  id_usuarios_r: number | null;
}

export interface EstudiosInitializer {
  /**
   * Default value: nextval('estudios_id_seq'::regclass)
   * Primary key. Index: estudios_pkey
   */
  id?: EstudiosId;

  numemp?: string;

  desccarrera?: string;

  descnivel?: string;

  titulado?: string;

  created_at?: Date;

  updated_at?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  id_usuarios_r?: number;
}
