// Automatically generated. Don't change this file manually.

export type CatbajamotivoId = number & { __flavor?: 'catbajamotivo' };

export default interface Catbajamotivo {
  /** Primary key. Index: catbajamotivo_pkey */
  id: CatbajamotivoId;

  clave: number | null;

  descripcion: string | null;

  clavebajaissste: number | null;

  idCatquincena: number | null;

  motivodefault: number | null;

  permitemovimientoposterior: number | null;

  puedeimplicarbajacargahoraria: number | null;

  pedirbajaparaissste: number | null;

  generamovanteissste: number | null;

  checarinterinatopuro: number | null;

  textoetiquetabaja: string | null;
}

export interface CatbajamotivoInitializer {
  /**
   * Default value: nextval('catbajamotivo_id_seq'::regclass)
   * Primary key. Index: catbajamotivo_pkey
   */
  id?: CatbajamotivoId;

  clave?: number;

  descripcion?: string;

  clavebajaissste?: number;

  idCatquincena?: number;

  motivodefault?: number;

  permitemovimientoposterior?: number;

  puedeimplicarbajacargahoraria?: number;

  pedirbajaparaissste?: number;

  generamovanteissste?: number;

  checarinterinatopuro?: number;

  textoetiquetabaja?: string;
}
