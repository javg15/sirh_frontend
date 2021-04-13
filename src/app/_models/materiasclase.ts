// Automatically generated. Don't change this file manually.

export type MateriasclaseId = number & { __flavor?: 'materiasclase' };

export default interface Materiasclase {

  /** Primary key. Index: materiasclase_pkey */
  id: MateriasclaseId;

  clave: string | null;

  nombre: string | null;

  horas: number | null;

  tipo: string | null;

  estatus: string | null;

  /*tipo2: string | null;

  tiposemestre: string | null;

  nogrupo: number | null;

  capacitacion: number | null;

  idcapacitacion: number | null;

  semestre: string | null;

  activa: number | null;

  claveasignatura: string | null;

  descarga: number | null;

  mapacurricular: string | null;

  programauna: number | null;

  claveoficial: string | null;

  idmateria2: string | null;

  apoyoeducacion: number | null;

  paraescolar: string | null;

  idgrupodisciplinario: number | null;

  bachgeneral: string | null;

  emsad: string | null;

  bachgeneralarte: string | null;*/

  id_semestre_ini: number | null;

  id_semestre_fin: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  /*fechacaptura: string | null;

  incluirb: number | null;

  incluira: number | null;

  permitemodifhorasmateria: number | null;

  posicionenmapacur: number | null;

  tratarcomoformbasica: number | null;

  idcampodisc: string | null;

  idgpodisc: number | null;

  formdiscbasicaartes: string | null;*/

  id_usuarios_r: number | null;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface MateriasclaseInitializer {


  /**
   * Default value: nextval('materiasclase_id_seq'::regclass)
   * Primary key. Index: materiasclase_pkey
   */
  id?: MateriasclaseId;

  clave?: string;

  nombre?: string;

  horas?: number;

  tipo?: string;

  estatus?: string;

  tipo2?: string;

  tiposemestre?: string;

  nogrupo?: number;

  capacitacion?: number;

  idcapacitacion?: number;

  semestre?: string;

  activa?: number;

  claveasignatura?: string;

  descarga?: number;

  mapacurricular?: string;

  programauna?: number;

  claveoficial?: string;

  idmateria2?: string;

  apoyoeducacion?: number;

  paraescolar?: string;

  idgrupodisciplinario?: number;

  bachgeneral?: string;

  emsad?: string;

  bachgeneralarte?: string;

  id_semestre_ini?: number;

  id_semestre_fin?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  fechacaptura?: string;

  incluirb?: number;

  incluira?: number;

  permitemodifhorasmateria?: number;

  posicionenmapacur?: number;

  tratarcomoformbasica?: number;

  idcampodisc?: string;

  idgpodisc?: number;

  formdiscbasicaartes?: string;

  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
