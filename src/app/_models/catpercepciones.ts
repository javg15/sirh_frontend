// Automatically generated. Don't change this file manually.

export type CatpercepcionesId = number & { __flavor?: 'catpercepciones' };

export default interface Catpercepciones {
  /** Primary key. Index: catpercepciones_pkey */
  id: CatpercepcionesId;

  clave: string | null;

  nombre: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;


}

export interface CatpercepcionesInitializer {
  /**
   * Default value: nextval('catpercepciones_id_seq'::regclass)
   * Primary key. Index: catpercepciones_pkey
   */
  id?: CatpercepcionesId;

  clave?: string;

  nombre?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;


}
