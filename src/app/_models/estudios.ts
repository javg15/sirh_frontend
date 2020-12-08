// Automatically generated. Don't change this file manually.

export type EstudiosId = number & { __flavor?: 'estudios' };

export default interface Estudios {
  numemp: string | null;

  desccarrera: string | null;

  descnivel: string | null;

  titulado: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: estudios_pk */
  id: EstudiosId;
}

export interface EstudiosInitializer {
  numemp?: string;

  desccarrera?: string;

  descnivel?: string;

  titulado?: string;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('estudios_id_seq'::regclass)
   * Primary key. Index: estudios_pk
   */
  id?: EstudiosId;
}
