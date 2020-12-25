// Automatically generated. Don't change this file manually.
export type CatmunicipiosId = number & { __flavor?: 'catmunicipios' };

export default interface Catmunicipios {
  id: number | null;

  clave: number | null;

  state: string | null;

  siglas: string | null;

  descripcion: string | null;

  id_catregiones: number | null;

  id_catestados: number | null;

  created_at: Date | null;

  updated_at: Date | null;

  id_usuarios_r: number | null;
}

export interface CatmunicipiosInitializer {
  id?: number;

  clave?: number;

  state?: string;

  siglas?: string;

  descripcion?: string;

  id_catregiones?: number;

  id_catestados?: number;

  created_at?: Date;

  updated_at?: Date;

  id_usuarios_r?: number;
}
