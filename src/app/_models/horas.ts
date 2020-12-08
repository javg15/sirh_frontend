// Automatically generated. Don't change this file manually.

export type HorasId = number & { __flavor?: 'horas' };

export default interface Horas {
  numemp: string;

  claveplantel: string | null;

  descplantel: string | null;

  clavemateria: string | null;

  nombremateria: string | null;

  grupo: string | null;

  tipohora: string | null;

  desccategoria: string | null;

  abrevnombramiento: string | null;

  descnombramiento: string | null;

  titular: string | null;

  cantidad: number | null;

  totalhoras: number | null;

  estudios: string | null;

  idhora: number | null;

  verificado: number | null;

  observaciones: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;

  /** Primary key. Index: horas_pk */
  id: HorasId;
}

export interface HorasInitializer {
  numemp: string;

  claveplantel?: string;

  descplantel?: string;

  clavemateria?: string;

  nombremateria?: string;

  grupo?: string;

  tipohora?: string;

  desccategoria?: string;

  abrevnombramiento?: string;

  descnombramiento?: string;

  titular?: string;

  cantidad?: number;

  totalhoras?: number;

  estudios?: string;

  idhora?: number;

  verificado?: number;

  observaciones?: string;

  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Default value: nextval('horas_id_seq'::regclass)
   * Primary key. Index: horas_pk
   */
  id?: HorasId;
}
