// Automatically generated. Don't change this file manually.

export type ModulosId = number & { __flavor?: 'modulos' };

export default interface Modulos {
  icode: string;

  idesc: string;

  state: string;

  ruta: string;

  rutamenu: string;

  controller: string;

  route: string;

  tabla: string;

  espordepartamento: number;

  essolousuario: number;

  opciones: string;

  ismenu: number;

  isroot: number;

  orden: number;

  iconmenu: string;

  observaciones: string;

  clase: string;

  esfuncion: number;

  foliadotipo: string;

  /** Primary key. Index: modulos_pkey */
  id: ModulosId;
}

export interface ModulosInitializer {
  /** Default value: ''::character varying */
  icode?: string;

  /** Default value: ''::character varying */
  idesc?: string;

  /** Default value: 'A'::bpchar */
  state?: string;

  /** Default value: ''::character varying */
  ruta?: string;

  /** Default value: ''::character varying */
  rutamenu?: string;

  /** Default value: ''::character varying */
  controller?: string;

  /** Default value: ''::character varying */
  route?: string;

  /** Default value: ''::character varying */
  tabla?: string;

  /** Default value: 0 */
  espordepartamento?: number;

  /** Default value: 0 */
  essolousuario?: number;

  /** Default value: 'ver'::character varying */
  opciones?: string;

  /** Default value: 1 */
  ismenu?: number;

  /** Default value: 0 */
  isroot?: number;

  /** Default value: 0 */
  orden?: number;

  /** Default value: ''::character varying */
  iconmenu?: string;

  /** Default value: ''::character varying */
  observaciones?: string;

  /** Default value: ''::character varying */
  clase?: string;

  /** Default value: 0 */
  esfuncion?: number;

  /** Default value: 'G'::bpchar */
  foliadotipo?: string;

  /**
   * Default value: nextval('modulos_id_seq'::regclass)
   * Primary key. Index: modulos_pkey
   */
  id?: ModulosId;
}
