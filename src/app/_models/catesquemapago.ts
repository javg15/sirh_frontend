// Automatically generated. Don't change this file manually.

export type CatesquemapagoId = number & { __flavor?: 'catesquemapago' };

export default interface Catesquemapago {
  /** Primary key. Index: catesquemapago_pkey */
  id: CatesquemapagoId;

  descripcion: string | null;

  abrev: string | null;
}

export interface CatesquemapagoInitializer {
  /**
   * Default value: nextval('catesquemapago_id_seq'::regclass)
   * Primary key. Index: catesquemapago_pkey
   */
  id?: CatesquemapagoId;

  descripcion?: string;

  abrev?: string;
}
