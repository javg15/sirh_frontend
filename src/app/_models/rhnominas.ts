// Automatically generated. Don't change this file manually.

export type RhnominasId = number & { __flavor?: 'rhnominas' };

export default interface Rhnominas {
  /** Primary key. Index: rhnominas_pkey */
  id: RhnominasId;

  quincenapago: number;

  numemp: string;

  nombreempleado: string;

  fechingcobaev: Date;

  antiguedad: string;

  clavecategoria: string;

  desccategoria: string;

  claveplantel: string;

  descplantel: string;

  clavect: string;

  nombrect: string;

  idqnavigini: number;

  idqnavigfin: number;

  qnainicio: string;

  qnafin: string;

  id_esquemapago: number;

  esquemapago: string;

  permensualneto: number;

  dedmensualneto: number;

  totmensualneto: number;

  compensacion: number;

  percquinbruto: number;

  deduquinbruto: number;

  totquinbruto: number;

  totmnbruto: number;

  idSindicato: number;

  siglassindicato: string;

  id_tipoemp: number;

  tipoempleado: string;

  id_empfuncion: number;

  empfuncion: string;

  id_funcionpri: number;

  funcionpri: string;

  id_funcionsec: number;

  funcionsec: string;

  clavemotgralbaja: number;

  desmotgralbaja: string;

  interinopuro: number;

  orden: number | null;

  verificado: number | null;

  observaciones: string | null;

  compensacionpa: number | null;

  rfc: string | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;
}

export interface RhnominasInitializer {
  /**
   * Default value: nextval('rhnominas_id_seq'::regclass)
   * Primary key. Index: rhnominas_pkey
   */
  id?: RhnominasId;

  quincenapago: number;

  numemp: string;

  nombreempleado: string;

  fechingcobaev: Date;

  antiguedad: string;

  clavecategoria: string;

  desccategoria: string;

  claveplantel: string;

  descplantel: string;

  clavect: string;

  nombrect: string;

  idqnavigini: number;

  idqnavigfin: number;

  qnainicio: string;

  qnafin: string;

  id_esquemapago: number;

  esquemapago: string;

  permensualneto: number;

  dedmensualneto: number;

  totmensualneto: number;

  compensacion: number;

  percquinbruto: number;

  deduquinbruto: number;

  totquinbruto: number;

  totmnbruto: number;

  idSindicato: number;

  siglassindicato: string;

  id_tipoemp: number;

  tipoempleado: string;

  id_empfuncion: number;

  empfuncion: string;

  id_funcionpri: number;

  funcionpri: string;

  id_funcionsec: number;

  funcionsec: string;

  clavemotgralbaja: number;

  desmotgralbaja: string;

  interinopuro: number;

  orden?: number;

  verificado?: number;

  observaciones?: string;

  compensacionpa?: number;

  rfc?: string;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;
}
