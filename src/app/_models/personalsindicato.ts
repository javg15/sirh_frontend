// Automatically generated. Don't change this file manually.

export type PersonalsindicatoId = number & { __flavor?: 'personalsindicato' };

export default interface Personalsindicato {
  /** Primary key. Index: personalsindicato_pkey */
  id: PersonalsindicatoId;

  id_personal: number;

  id_archivos: number | null;

  id_catsindicato: number;

  fechainscripcion: Date | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PersonalsindicatoInitializer {
  /**
   * Default value: nextval('personalsindicato_id_seq'::regclass)
   * Primary key. Index: personalsindicato_pkey
   */
  id?: PersonalsindicatoId;

  /** Default value: 0 */
  id_personal?: number;

  id_archivos?: number;

  id_catsindicato?: number;

  fechainscripcion?: Date;

  sexo?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
