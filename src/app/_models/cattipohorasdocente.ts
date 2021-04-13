// Automatically generated. Don't change this file manually.

export type CattipohorasdocenteId = number & { __flavor?: 'cattipohorasdocente' };

export default interface Cattipohorasdocente {
  /** Primary key. Index: cattipohorasdocente_pkey */
  id: CattipohorasdocenteId;

  tipohora: string | null;

  idCategorias: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  prioridadparahomologar: number | null;
}

export interface CattipohorasdocenteInitializer {
  /**
   * Default value: nextval('cattipohorasdocente_id_seq'::regclass)
   * Primary key. Index: cattipohorasdocente_pkey
   */
  id?: CattipohorasdocenteId;

  tipohora?: string;

  idCategorias?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  prioridadparahomologar?: number;
}
