// Automatically generated. Don't change this file manually.

export default interface Plazas {
  /** Primary key. Index: plazas_pkey */
  id: number | null;

  id_categorias: number | null;

  consecutivo: number | null;

  id_catplanteles: number | null;

  id_catcentrostrabajo: number | null;

  id_catplantelescobro: number | null;

  id_catzonageografica: number | null;

  id_catquincena_ini: number | null;

  id_catquincena_fin: number | null;

  id_catestatusplaza: number | null;

  statussicodes: number | null;

  id_puesto: number | null;

  id_catsindicato: number | null;

  id_categoriasdetalle: number | null;

  estatus: string | null;

  state: string | null;

  created_at: Date | null;

  updated_at: Date | null;

  id_usuarios_r: number | null;
}

export interface PlazasInitializer {
  /**
   * Default value: nextval('plazas_id_seq'::regclass)
   * Primary key. Index: plazas_pkey
   */
  id?: number;

  id_categorias?: number;

  consecutivo?: number;

  id_catplanteles?: number;

  id_catcentrostrabajo?: number;

  id_catplantelescobro?: number;

  id_catzonageografica?: number;

  id_catquincena_ini?: number;

  id_catquincena_fin?: number;

  id_catestatusplaza?: number;

  statussicodes?: number;

  id_puesto?: number;

  id_catsindicato?: number;

  id_categoriasdetalle?: number;

  estatus?: string;

  state?: string;

  created_at?: Date;

  updated_at?: Date;

  id_usuarios_r?: number;
}
