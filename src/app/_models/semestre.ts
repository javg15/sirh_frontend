// Automatically generated. Don't change this file manually.

export type SemestreId = number & { __flavor?: 'semestre' };

export default interface Semestre {
  /** Primary key. Index: semestre_pkey */
  id: SemestreId;

  tipo: string | null;

  anio: number | null;

  quincena: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  qnainiciosemestre: string | null;

  qnafinsemestre: string | null;

  actual: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_catquincena_fininterinas: number | null;

  permitemodificacion: number | null;

  permitecargadeplantillas: number | null;
}

export interface SemestreInitializer {
  /**
   * Default value: nextval('semestre_id_seq'::regclass)
   * Primary key. Index: semestre_pkey
   */
  id?: SemestreId;

  tipo?: string;

  anio?: number;

  quincena?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  qnainiciosemestre?: string;

  qnafinsemestre?: string;

  actual?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  id_catquincena_fininterinas?: number;

  permitemodificacion?: number;

  permitecargadeplantillas?: number;
}
