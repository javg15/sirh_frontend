// Automatically generated. Don't change this file manually.

export type CatzonaeconomicaId = number & { __flavor?: 'catzonaeconomica' };

export default interface Catzonaeconomica {
  /** Primary key. Index: catzonaeconomica_pkey */
  id: CatzonaeconomicaId;

  clave: number | null;

  porcentaje: number | null;

  state: string | null;

  descripcion: string | null;


  created_at: Date | null;

  updated_at: Date | null;

  id_usuarios_r: number | null;
}

export interface CatzonaeconomicaInitializer {
  /**
   * Default value: nextval('catzonaeconomica_id_seq'::regclass)
   * Primary key. Index: catzonaeconomica_pkey
   */
  id?: CatzonaeconomicaId;

  clave?: number;

  porcentaje?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  descripcion?: string;

  created_at?: Date;

  updated_at?: Date;

  id_usuarios_r?: number;
}
