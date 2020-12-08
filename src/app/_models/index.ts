// Automatically generated. Don't change this file manually.

import Calendarios, { CalendariosInitializer, CalendariosId } from './calendarios';
import Catfuentef, { CatfuentefInitializer, CatfuentefId } from './catfuentef';
import Ejercicioreal, { EjerciciorealInitializer, EjerciciorealId } from './ejercicioreal';
import Estudios, { EstudiosInitializer, EstudiosId } from './estudios';
import Horas, { HorasInitializer, HorasId } from './horas';
import Log, { LogInitializer } from './log';
import Ministraciones, { MinistracionesInitializer, MinistracionesId } from './ministraciones';
import Modulos, { ModulosInitializer, ModulosId } from './modulos';
import Permgrupos, { PermgruposInitializer, PermgruposId } from './permgrupos';
import Permgruposmodulos, { PermgruposmodulosInitializer, PermgruposmodulosId } from './permgruposmodulos';
import Permusuariosmodulos, { PermusuariosmodulosInitializer, PermusuariosmodulosId } from './permusuariosmodulos';
import Presupuesto, { PresupuestoInitializer, PresupuestoId } from './presupuesto';
import Rhnominas, { RhnominasInitializer, RhnominasId } from './rhnominas';
import Usuarios, { UsuariosInitializer, UsuariosId } from './usuarios';
import Vanexoejecucion from './vanexoejecucion';
import Vavancemeses from './vavancemeses';

type Model =
  | Calendarios
  | Catfuentef
  | Ejercicioreal
  | Estudios
  | Horas
  | Log
  | Ministraciones
  | Modulos
  | Permgrupos
  | Permgruposmodulos
  | Permusuariosmodulos
  | Presupuesto
  | Rhnominas
  | Usuarios
  | Vanexoejecucion
  | Vavancemeses

interface ModelTypeMap {
  'calendarios': Calendarios;
  'catfuentef': Catfuentef;
  'ejercicioreal': Ejercicioreal;
  'estudios': Estudios;
  'horas': Horas;
  'log': Log;
  'ministraciones': Ministraciones;
  'modulos': Modulos;
  'permgrupos': Permgrupos;
  'permgruposmodulos': Permgruposmodulos;
  'permusuariosmodulos': Permusuariosmodulos;
  'presupuesto': Presupuesto;
  'rhnominas': Rhnominas;
  'usuarios': Usuarios;
  'vanexoejecucion': Vanexoejecucion;
  'vavancemeses': Vavancemeses;
}

type ModelId =
  | CalendariosId
  | CatfuentefId
  | EjerciciorealId
  | EstudiosId
  | HorasId
  | MinistracionesId
  | ModulosId
  | PermgruposId
  | PermgruposmodulosId
  | PermusuariosmodulosId
  | PresupuestoId
  | RhnominasId
  | UsuariosId

interface ModelIdTypeMap {
  'calendarios': CalendariosId;
  'catfuentef': CatfuentefId;
  'ejercicioreal': EjerciciorealId;
  'estudios': EstudiosId;
  'horas': HorasId;
  'ministraciones': MinistracionesId;
  'modulos': ModulosId;
  'permgrupos': PermgruposId;
  'permgruposmodulos': PermgruposmodulosId;
  'permusuariosmodulos': PermusuariosmodulosId;
  'presupuesto': PresupuestoId;
  'rhnominas': RhnominasId;
  'usuarios': UsuariosId;
}

type Initializer =
  | CalendariosInitializer
  | CatfuentefInitializer
  | EjerciciorealInitializer
  | EstudiosInitializer
  | HorasInitializer
  | LogInitializer
  | MinistracionesInitializer
  | ModulosInitializer
  | PermgruposInitializer
  | PermgruposmodulosInitializer
  | PermusuariosmodulosInitializer
  | PresupuestoInitializer
  | RhnominasInitializer
  | UsuariosInitializer

interface InitializerTypeMap {
  'calendarios': CalendariosInitializer;
  'catfuentef': CatfuentefInitializer;
  'ejercicioreal': EjerciciorealInitializer;
  'estudios': EstudiosInitializer;
  'horas': HorasInitializer;
  'log': LogInitializer;
  'ministraciones': MinistracionesInitializer;
  'modulos': ModulosInitializer;
  'permgrupos': PermgruposInitializer;
  'permgruposmodulos': PermgruposmodulosInitializer;
  'permusuariosmodulos': PermusuariosmodulosInitializer;
  'presupuesto': PresupuestoInitializer;
  'rhnominas': RhnominasInitializer;
  'usuarios': UsuariosInitializer;
}

export {
  Calendarios, CalendariosInitializer, CalendariosId,
  Catfuentef, CatfuentefInitializer, CatfuentefId,
  Ejercicioreal, EjerciciorealInitializer, EjerciciorealId,
  Estudios, EstudiosInitializer, EstudiosId,
  Horas, HorasInitializer, HorasId,
  Log, LogInitializer,
  Ministraciones, MinistracionesInitializer, MinistracionesId,
  Modulos, ModulosInitializer, ModulosId,
  Permgrupos, PermgruposInitializer, PermgruposId,
  Permgruposmodulos, PermgruposmodulosInitializer, PermgruposmodulosId,
  Permusuariosmodulos, PermusuariosmodulosInitializer, PermusuariosmodulosId,
  Presupuesto, PresupuestoInitializer, PresupuestoId,
  Rhnominas, RhnominasInitializer, RhnominasId,
  Usuarios, UsuariosInitializer, UsuariosId,
  Vanexoejecucion,
  Vavancemeses,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
