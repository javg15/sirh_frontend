// Automatically generated. Don't change this file manually.

export type CategoriaspercepcionesId = number & { __flavor?: 'categoriaspercepciones' };

export default interface Categoriaspercepciones {
  /** Primary key. Index: categoriasautorizadas_pkey */
  id: CategoriaspercepcionesId;

  id_categoriasdetalle: number | null;

  importe: number | null;

  fecha_inicio: Date | null;

  fecha_fin: Date | null;

  id_catquincena_ini: number;

  id_catquincena_fin: number,

  id_catpercepciones: number,

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CategoriaspercepcionesInitializer {
  /**
   * Default value: nextval('categoriasautorizadas_id_seq'::regclass)
   * Primary key. Index: categoriasautorizadas_pkey
   */
  id?: CategoriaspercepcionesId;

  id_categoriasdetalle?: number;

  importe?: number;

  fecha_inicio?: Date;

  fecha_fin?: Date;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number,

  id_catpercepciones?: number,
  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
