// Automatically generated. Don't change this file manually.

export type RhnominasId = number & { __flavor?: 'rhnominas' };

export default interface Rhnominas {
  quincenapago: number;

  numemp: string;

  nombreempleado: string;

  fchingcobaev: string;

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

  idEsquemapago: number;

  esquemapago: string;

  permensualneto: number;

  dedmensualneto: number;

  totmensualneto: number;

  compensacion: number;

  percquinbruto: number;

  deduquinbruto: number;

  totquinbruto: number;

  totmenbruto: number;

  idSindicato: number;

  siglassindicato: string;

  idTipoemp: number;

  tipoempleado: string;

  idEmpfuncion: number;

  empfuncion: string;

  idFuncionpri: number;

  funcionpri: string;

  idFuncionsec: number;

  funcionsec: string;

  clavemotgralbaja: number;

  desmotgralbaja: string;

  interinopuro: number;

  orden: number | null;

  verificado: number | null;

  observaciones: string | null;

  compensacionpa: number | null;

  rFC: string | null;

  state: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: rhnominas_pk */
  id: RhnominasId;
}

export interface RhnominasInitializer {
  quincenapago: number;

  numemp: string;

  nombreempleado: string;

  fchingcobaev: string;

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

  idEsquemapago: number;

  esquemapago: string;

  permensualneto: number;

  dedmensualneto: number;

  totmensualneto: number;

  compensacion: number;

  percquinbruto: number;

  deduquinbruto: number;

  totquinbruto: number;

  totmenbruto: number;

  idSindicato: number;

  siglassindicato: string;

  idTipoemp: number;

  tipoempleado: string;

  idEmpfuncion: number;

  empfuncion: string;

  idFuncionpri: number;

  funcionpri: string;

  idFuncionsec: number;

  funcionsec: string;

  clavemotgralbaja: number;

  desmotgralbaja: string;

  interinopuro: number;

  orden?: number;

  verificado?: number;

  observaciones?: string;

  compensacionpa?: number;

  rFC?: string;

  state?: string;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('rhnominas_id_seq'::regclass)
   * Primary key. Index: rhnominas_pk
   */
  id?: RhnominasId;
}
