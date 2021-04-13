// Automatically generated. Don't change this file manually.

export type CatquincenaId = number & { __flavor?: 'catquincena' };

export default interface Catquincena {
  /** Primary key. Index: catquincena_pkey */
  id: CatquincenaId;

  anio: number | null;

  quincena: number | null;

  fechainicio: Date | null;

  fechafin: Date | null;

  id_usuarios_r: number;

  state: string;

  created_at: Date | null;

  updated_at: Date | null;

  adicional: number | null;

  idestatusquincena: number | null;

  periodovacacional: string | null;

  fechadepago: string | null;

  observaciones: string | null;

  fechacierre: string | null;

  observaciones2: string | null;

  bimestre: number | null;

  aplicarajusteispt: number | null;

  pagoderetroactividad: number | null;

  liberadaparaportaladmvo: string | null;

  permiteabcderecibos: string | null;
}

export interface CatquincenaInitializer {
  /**
   * Default value: nextval('catquincena_id_seq'::regclass)
   * Primary key. Index: catquincena_pkey
   */
  id?: CatquincenaId;

  anio?: number;

  quincena?: number;

  fechainicio?: Date;

  fechafin?: Date;

  /** Default value: 0 */
  id_usuarios_r?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  created_at?: Date;

  updated_at?: Date;

  adicional?: number;

  idestatusquincena?: number;

  periodovacacional?: string;

  fechadepago?: string;

  observaciones?: string;

  fechacierre?: string;

  observaciones2?: string;

  bimestre?: number;

  aplicarajusteispt?: number;

  pagoderetroactividad?: number;

  liberadaparaportaladmvo?: string;

  permiteabcderecibos?: string;
}
