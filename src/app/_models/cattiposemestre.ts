// Automatically generated. Don't change this file manually.

export type CattiposemestreId = number & { __flavor?: 'cattiposemestre' };

export default interface Cattiposemestre {
  /** Primary key. Index: cattiposemestre_pkey */
  id: CattiposemestreId;

  descripcion: string | null;
}

export interface CattiposemestreInitializer {
  /**
   * Default value: nextval('cattiposemestre_id_seq'::regclass)
   * Primary key. Index: cattiposemestre_pkey
   */
  id?: CattiposemestreId;

  descripcion?: string;
}
