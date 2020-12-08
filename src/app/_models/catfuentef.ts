// Automatically generated. Don't change this file manually.

export type CatfuentefId = number & { __flavor?: 'catfuentef' };

export default interface Catfuentef {
  nombre: string | null;

  /** Primary key. Index: catfuentef_pk */
  id: CatfuentefId;
}

export interface CatfuentefInitializer {
  nombre?: string;

  /**
   * Default value: nextval('catfuentef_id_seq'::regclass)
   * Primary key. Index: catfuentef_pk
   */
  id?: CatfuentefId;
}
