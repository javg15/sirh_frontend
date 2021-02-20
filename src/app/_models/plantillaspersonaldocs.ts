// Automatically generated. Don't change this file manually.

export default interface Plantillaspersonaldocs {
  /** Primary key. Index: plantillaspersonaldocs_pkey */
  id: number;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  fechaexpedicion: Date | null;

  ultimogradoestudios: number | null;

  areacarrera: number | null;

  carrera: number | null;

  estatus: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PlantillaspersonaldocsInitializer {
  /**
   * Default value: nextval('plantillaspersonaldocs_id_seq'::regclass)
   * Primary key. Index: plantillaspersonaldocs_pkey
   */
  id?: number;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  /** Default value: 0 */
  tipodoc?: number;

  id_archivos?: number;

  fechaexpedicion?: Date;

  ultimogradoestudios?: number;

  areacarrera?: number;

  carrera?: number;

  estatus?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
