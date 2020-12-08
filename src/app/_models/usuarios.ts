// Automatically generated. Don't change this file manually.

export type UsuariosId = number & { __flavor?: 'usuarios' };

export default interface Usuarios {
  /** Primary key. Index: usuarios_pk */
  id: UsuariosId;

  username: string;

  pass: string;

  uPassenc: string | null;

  perfil: number | null;

  nombre: string | null;

  numemp: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  idPermgrupos: number | null;

  idUsuariosR: number | null;

  state: string | null;

  email: string | null;
}

export interface UsuariosInitializer {
  /**
   * Default value: nextval('usuarios2_id_seq'::regclass)
   * Primary key. Index: usuarios_pk
   */
  id?: UsuariosId;

  username: string;

  pass: string;

  uPassenc?: string;

  perfil?: number;

  nombre?: string;

  numemp?: string;

  createdAt?: Date;

  updatedAt?: Date;

  idPermgrupos?: number;

  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  email?: string;
}

