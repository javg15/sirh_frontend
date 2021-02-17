// Automatically generated. Don't change this file manually.

export type PlantillasdocsfamiliaresId = number & { __flavor?: 'plantillasdocsfamiliares' };

export default interface Plantillasdocsfamiliares {
  /** Primary key. Index: plantillasdocsfamiliares_pkey */
  id: PlantillasdocsfamiliaresId;

  idPlantillaspersonal: number;

  idArchivos: number | null;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento: Date | null;

  sexo: string | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface PlantillasdocsfamiliaresInitializer {
  /**
   * Default value: nextval('plantillasdocsfamiliares_id_seq'::regclass)
   * Primary key. Index: plantillasdocsfamiliares_pkey
   */
  id?: PlantillasdocsfamiliaresId;

  /** Default value: 0 */
  idPlantillaspersonal?: number;

  idArchivos?: number;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento?: Date;

  sexo?: string;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
