// Automatically generated. Don't change this file manually.

export type PlantillaspersonalId = number & { __flavor?: 'plantillaspersonal' };

export default interface Plantillaspersonal {
  /** Primary key. Index: plantillaspersonal_pkey */
  id: PlantillaspersonalId;

  id_catplanteles: number;

  id_personal: number;

  id_catplantillas: number;

  consecutivo: string;

  id_usuarios_autoriza: number | null;

  id_usuarios_r: number;

  state: string;

  fechaingreso: Date | null;

  created_at: Date | null;

  updated_at: Date | null;
  
  permitemasdeuna: number;

  permitevariosnombramientos: number;
}

export interface PlantillaspersonalInitializer {
  /**
   * Default value: nextval('plantillaspersonal_id_seq'::regclass)
   * Primary key. Index: plantillaspersonal_pkey
   */
  id?: PlantillaspersonalId;

  /** Default value: 0 */
  id_catplanteles?: number;

  /** Default value: 0 */
  id_personal?: number;

  /** Default value: 0 */
  id_catplantillas?: number;

  /** Default value: 0 */
  consecutivo?: string;

  id_usuarios_autoriza?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  fechaingreso?: Date;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  permitemasdeuna?: number;

  permitevariosnombramientos?: number;
}
