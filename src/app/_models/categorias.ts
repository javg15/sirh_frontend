// Automatically generated. Don't change this file manually.

export type CategoriasId = number & { __flavor?: 'categorias' };

export default interface Categorias {
  /** Primary key. Index: categorias_pkey */
  id: CategoriasId;

  clave: string | null;

  codigo: string | null;

  denominacion: string | null;

  nivelsalarial: string | null;

  id_tipocategoria: number | null;

  id_tiponomina: number | null;

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

  codigo?: string;

  denominacion?: string;

  nivelsalarial?: string;

  id_tipocategoria?: number;

  id_tiponomina?: number;

  created_at?: Date;

  updated_at?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  id_usuarios_r?: number;
}
