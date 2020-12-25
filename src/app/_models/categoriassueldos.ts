// Automatically generated. Don't change this file manually.

export type CategoriassueldosId = number & { __flavor?: 'categoriassueldos' };

export default interface Categoriassueldos {
  /** Primary key. Index: categoriasautorizadas_pkey */
  id: CategoriassueldosId;

  clave: string | null;

  id_categorias: number | null;

  importe: number | null;

  id_catquincena_inicio: number | null;

  id_catquincena_fin: number | null;

  totalplazaaut: number | null;

  totalhorasaut: number | null;

  id_catzonaeconomica: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CategoriassueldosInitializer {
  /**
   * Default value: nextval('categoriasautorizadas_id_seq'::regclass)
   * Primary key. Index: categoriasautorizadas_pkey
   */
  id?: CategoriassueldosId;

  clave?: string;

  id_categorias?: number;

  importe?: number;

  id_catquincena_inicio?: number;

  id_catquincena_fin?: number;

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
