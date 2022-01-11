// Automatically generated. Don't change this file manually.

export type PersonalfamiliaresId = number & { __flavor?: 'personalfamiliares' };

export default interface Personalfamiliares {
  /** Primary key. Index: personalfamiliares_pkey */
  id: PersonalfamiliaresId;

  id_personal: number;

  id_archivos: number | null;

  id_catdocumentos: number | null;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento: Date | null;

  sexo: number | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PersonalfamiliaresInitializer {
  /**
   * Default value: nextval('personalfamiliares_id_seq'::regclass)
   * Primary key. Index: personalfamiliares_pkey
   */
  id?: PersonalfamiliaresId;

  /** Default value: 0 */
  id_personal?: number;

  id_archivos?: number;

  id_catdocumentos?: number;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  fechanacimiento?: Date;

  sexo?: number;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
