// Automatically generated. Don't change this file manually.

export type CatfuncionprimariaId = number & { __flavor?: 'catfuncionprimaria' };

export default interface Catfuncionprimaria {
  /** Primary key. Index: catfuncionprimaria_pkey */
  id: CatfuncionprimariaId;

  clave: string | null;

  nombre: string | null;

  idempfuncion: number | null;
}

export interface CatfuncionprimariaInitializer {
  /**
   * Default value: nextval('catfuncionprimaria_id_seq'::regclass)
   * Primary key. Index: catfuncionprimaria_pkey
   */
  id?: CatfuncionprimariaId;

  clave?: string;

  nombre?: string;

  idempfuncion?: number;
}
