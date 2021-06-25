// Automatically generated. Don't change this file manually.

export type CattipohorasmateriaId = number & { __flavor?: 'cattipohorasmateria' };

export default interface Cattipohorasmateria {
  /** Primary key. Index: cattipohorasclase_pkey */
  id: CattipohorasmateriaId;

  clave: string | null;

  descripcion: string | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface CattipohorasmateriaInitializer {
  /**
   * Default value: nextval('cattipohorasclase_id_seq'::regclass)
   * Primary key. Index: cattipohorasclase_pkey
   */
  id?: CattipohorasmateriaId;

  clave?: string;

  descripcion?: string;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
