// Automatically generated. Don't change this file manually.

export type CatestatusplazaId = number & { __flavor?: 'catestatusplaza' };

export default interface Catestatusplaza {
  /** Primary key. Index: catestatusplaza_pkey */
  id: CatestatusplazaId;

  descripcion: string | null;

  id_estatussig: string | null;

  strid_nombramiento: string | null;

  tipoocupplaza: string | null;

  created_at: Date | null;

  updated_at: Date | null;

  state: string;

  id_usuarios_r: number | null;
}

export interface CatestatusplazaInitializer {
  /**
   * Default value: nextval('t_catestatusplaza_id_seq'::regclass)
   * Primary key. Index: catestatusplaza_pkey
   */
  id?: CatestatusplazaId;

  descripcion?: string;

  id_estatussig?: string;

  strid_nombramiento?: string;

  tipoocupplaza?: string;

  created_at?: Date;

  updated_at?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  id_usuarios_r?: number;
}
