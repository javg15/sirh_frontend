// Automatically generated. Don't change this file manually.

export default interface Personal {
  /** Primary key. Index: personal_pkey */
  id: number;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  id_catestadocivil: number;

  sexo: number;

  fechanacimiento: Date;

  id_catestadosresi: number;

  id_catmunicipiosresi: number;

  id_catlocalidadesresi: number;

  telefono: string;

  email: string;

  emailoficial: string;

  observaciones: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface PersonalInitializer {
  /**
   * Default value: nextval('personal_id_seq'::regclass)
   * Primary key. Index: personal_pkey
   */
  id?: number;

  curp: string;

  rfc: string;

  homoclave: string;

  nombre: string;

  apellidopaterno: string;

  apellidomaterno: string;

  id_catestadocivil: number;

  sexo: number;

  fechanacimiento: Date;

  id_catestadosresi: number;

  id_catmunicipiosresi: number;

  id_catlocalidadesresi: number;

  telefono: string;

  email: string;

  emailoficial: string;

  observaciones?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
