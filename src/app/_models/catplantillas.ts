// Automatically generated. Don't change this file manually.

export type CatplantillasId = number & { __flavor?: 'catplantillas' };

export default interface Catplantillas {
  /** Primary key. Index: catplantillas_pkey */
  id: CatplantillasId;

  descripcion: string | null;

  abreviatura: string | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
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
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
