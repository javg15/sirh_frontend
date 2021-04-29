// Automatically generated. Don't change this file manually.

export type CategoriasdetalleId = number & { __flavor?: 'categoriasdetalle' };

export default interface Categoriasdetalle {
  /** Primary key. Index: categoriasautorizadas_pkey */
  id: CategoriasdetalleId;

  codigo: string | null;

  id_categorias: number | null;

  totalplazaaut: number | null;

  totalhorasaut: number | null;

  id_catzonaeconomica: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CategoriasdetalleInitializer {
  /**
   * Default value: nextval('categoriasautorizadas_id_seq'::regclass)
   * Primary key. Index: categoriasautorizadas_pkey
   */
  id?: CategoriasdetalleId;

  codigo?: string;

  id_categorias?: number;

  totalplazaaut?: number;

  totalhorasaut?: number;

  id_catzonaeconomica?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
