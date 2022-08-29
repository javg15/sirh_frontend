// Automatically generated. Don't change this file manually.

export type CategoriasId = number & { __flavor?: 'categorias' };

export default interface Categorias {
  /** Primary key. Index: categorias_pkey */
  id: CategoriasId;

  clave: string | null;

  denominacion: string | null;

  nivelsalarial: string | null;

  id_cattipocategoria: number | null;

  id_tiponomina: number | null;

  aplicaa: number | null;

  created_at: Date | null;

  updated_at: Date | null;

  state: string;

  id_usuarios_r: number | null;
}

export interface CategoriasInitializer {
  /**
   * Default value: nextval('t_categorias_id_seq'::regclass)
   * Primary key. Index: categorias_pkey
   */
  id?: CategoriasId;

  clave?: string;

  denominacion?: string;

  nivelsalarial?: string;

  id_cattipocategoria?: number;

  id_tiponomina?: number;

  aplicaa?: number;

  horasasignadas?: number;

  created_at?: Date;

  updated_at?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  id_usuarios_r?: number;
}
