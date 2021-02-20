// Automatically generated. Don't change this file manually.

export type CatplantillasId = number & { __flavor?: 'catplantillas' };

export default interface Catplantillas {
  /** Primary key. Index: catplantillas_pkey */
  id: CatplantillasId;

  descripcion: string | null;

  abreviatura: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface CatplantillasInitializer {
  /**
   * Default value: nextval('catplantillas_id_seq'::regclass)
   * Primary key. Index: catplantillas_pkey
   */
  id?: CatplantillasId;

  descripcion?: string;

  abreviatura?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
