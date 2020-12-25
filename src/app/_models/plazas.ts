// Automatically generated. Don't change this file manually.

export type PlazasId = number & { __flavor?: 'plazas' };

export default interface Plazas {
  /** Primary key. Index: plazas_pkey */
  id: PlazasId;

  idCategoria: number | null;

  consecutivo: number | null;

  idCatplanteles: number | null;

  idCatcentrostrabajo: number | null;

  idCatzonaeconomica: number | null;

  idCatzonageografica: number | null;

  idQnainicio: number | null;

  idQnafin: number | null;

  idStatus: number | null;

  idEstatussicodes: number | null;

  idPuesto: number | null;

  idUsuariosR: number;

  state: string;

  createdAt: Date | null;

  updatedAt: Date | null;
}

export interface PlazasInitializer {
  /**
   * Default value: nextval('plazas_id_seq'::regclass)
   * Primary key. Index: plazas_pkey
   */
  id?: PlazasId;

  idCategoria?: number;

  consecutivo?: number;

  idCatplanteles?: number;

  idCatcentrostrabajo?: number;

  idCatzonaeconomica?: number;

  idCatzonageografica?: number;

  idQnainicio?: number;

  idQnafin?: number;

  idStatus?: number;

  idEstatussicodes?: number;

  idPuesto?: number;

  /** Default value: 0 */
  idUsuariosR?: number;

  /** Default value: 'A'::bpchar */
  state?: string;

  createdAt?: Date;

  updatedAt?: Date;
}
