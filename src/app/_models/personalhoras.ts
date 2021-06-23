// Automatically generated. Don't change this file manually.

export type PersonalhorasId = number & { __flavor?: 'personalhoras' };

export default interface Personalhoras {
  /** Primary key. Index: horas_pkey1 */
  id: PersonalhorasId;

  id_personal: number | null;

  id_plazas: number | null;

  cantidad: number | null;

  id_cattipohorasmateria: number | null;

  id_catnombramientos: number | null;

  id_semestre: number | null;

  id_catestatushora: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  id_horasclase: number | null;
}

export interface PersonalhorasInitializer {
  /**
   * Default value: nextval('horas_id_seq1'::regclass)
   * Primary key. Index: horas_pkey1
   */
  id?: PersonalhorasId;

  id_personal?: number;

  id_plazas?: number;

  cantidad?: number;

  id_cattipohorasmateria?: number;

  id_catnombramientos?: number;

  id_semestre?: number;

  id_catestatushora?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  id_horasclase?: number;
}
