// Automatically generated. Don't change this file manually.

export type PlantillasdocsfamiliaresId = number & { __flavor?: 'plantillasdocsfamiliares' };

export default interface Plantillasdocsfamiliares {
  /** Primary key. Index: plantillasdocsfamiliares_pkey */
  id: PlantillasdocsfamiliaresId;

  id_plantillaspersonal: number;

  id_archivos: number | null;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento: Date | null;

  sexo: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PlantillasdocsfamiliaresInitializer {
  /**
   * Default value: nextval('plantillasdocsfamiliares_id_seq'::regclass)
   * Primary key. Index: plantillasdocsfamiliares_pkey
   */
  id?: PlantillasdocsfamiliaresId;

  /** Default value: 0 */
  id_plantillaspersonal?: number;

  id_archivos?: number;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento?: Date;

  sexo?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
