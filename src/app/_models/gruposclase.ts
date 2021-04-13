// Automatically generated. Don't change this file manually.

export type GruposclaseId = number & { __flavor?: 'gruposclase' };

export default interface Gruposclase {
  /** Primary key. Index: gruposclase_pkey */
  id: GruposclaseId;

  grupo: string | null;

  tiposemestre: string | null;

  letragrupo: string | null;

  programauna: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface GruposclaseInitializer {
  /**
   * Default value: nextval('gruposclase_id_seq'::regclass)
   * Primary key. Index: gruposclase_pkey
   */
  id?: GruposclaseId;

  grupo?: string;

  tiposemestre?: string;

  letragrupo?: string;

  programauna?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
