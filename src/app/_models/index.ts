// Automatically generated. Don't change this file manually.
import Catestatusplaza, { CatestatusplazaInitializer, CatestatusplazaId } from './catestatusplaza';
import Categorias, { CategoriasInitializer, CategoriasId } from './categorias';
import Calendarios, { CalendariosInitializer, CalendariosId } from './calendarios';
import Catcentrostrabajo, { CatcentrostrabajoInitializer } from './catcentrostrabajo';
import Catfuentef, { CatfuentefInitializer, CatfuentefId } from './catfuentef';
import Catlocalidades, { CatlocalidadesInitializer } from './catlocalidades';
import Catestados, { CatestadosInitializer } from './catestados';
import Catmunicipios, { CatmunicipiosInitializer } from './catmunicipios';
import Catplanteles, { CatplantelesInitializer } from './catplanteles';
import Catregiones, { CatregionesInitializer } from './catregiones';
import Cattipocategoria, { CattipocategoriaInitializer } from './cattipocategoria';
import Cattiponomina, { CattiponominaInitializer } from './cattiponomina';
import Catzonaeconomica, { CatzonaeconomicaInitializer, CatzonaeconomicaId } from './catzonaeconomica';
import Catzonageografica, { CatzonageograficaInitializer } from './catzonageografica';
import Ejercicioreal, { EjerciciorealInitializer, EjerciciorealId } from './ejercicioreal';
import Estudios, { EstudiosInitializer, EstudiosId } from './estudios';
import Horas, { HorasInitializer, HorasId } from './horas';
import Log, { LogInitializer, LogId } from './log';
import Ministraciones, { MinistracionesInitializer, MinistracionesId } from './ministraciones';
import Modulos, { ModulosInitializer, ModulosId } from './modulos';
import Permgrupos, { PermgruposInitializer, PermgruposId } from './permgrupos';
import Permgruposmodulos, { PermgruposmodulosInitializer, PermgruposmodulosId } from './permgruposmodulos';
import Permusuariosmodulos, { PermusuariosmodulosInitializer, PermusuariosmodulosId } from './permusuariosmodulos';
import Presupuesto, { PresupuestoInitializer, PresupuestoId } from './presupuesto';
import Rhnominas, { RhnominasInitializer, RhnominasId } from './rhnominas';
import Searchcampos, { SearchcamposInitializer, SearchcamposId } from './searchcampos';
import Searchoperador, { SearchoperadorInitializer, SearchoperadorId } from './searchoperador';
import Usuarios, { UsuariosInitializer, UsuariosId } from './usuarios';

type Model =
  | Catestatusplaza
  | Calendarios
  | Categorias
  | Catcentrostrabajo
  | Catfuentef
  | Catlocalidades
  | Catmunicipios
  | Catestados
  | Catplanteles
  | Catregiones
  | Cattipocategoria
  | Cattiponomina
  | Catzonaeconomica
  | Catzonageografica
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
  | Searchcampos
  | Searchoperador
  | Usuarios

interface ModelTypeMap {
  'catestatusplaza':Catestatusplaza;
  'calendarios': Calendarios;
  'categorias': Categorias;
  'catcentrostrabajo': Catcentrostrabajo;
  'catfuentef': Catfuentef;
  'catlocalidades': Catlocalidades;
  'catestados': Catestados;
  'catmunicipios': Catmunicipios;
  'catplanteles': Catplanteles;
  'catregiones': Catregiones;
  'cattipocategoria': Cattipocategoria;
  'cattiponomina': Cattiponomina;
  'catzonaeconomica': Catzonaeconomica;
  'catzonageografica': Catzonageografica;
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
  'searchcampos': Searchcampos;
  'searchoperador': Searchoperador;
  'usuarios': Usuarios;
}

type ModelId =
  | CatestatusplazaId
  | CategoriasId
  | CalendariosId
  | CatfuentefId
  | CatzonaeconomicaId
  | EjerciciorealId
  | EstudiosId
  | HorasId
  | LogId
  | MinistracionesId
  | ModulosId
  | PermgruposId
  | PermgruposmodulosId
  | PermusuariosmodulosId
  | PresupuestoId
  | RhnominasId
  | SearchcamposId
  | SearchoperadorId
  | UsuariosId

interface ModelIdTypeMap {
  'catestatusplaza':Catestatusplaza;
  'calendarios': CalendariosId;
  'categorias': CategoriasId;
  'catfuentef': CatfuentefId;
  'catzonaeconomica': CatzonaeconomicaId;
  'ejercicioreal': EjerciciorealId;
  'estudios': EstudiosId;
  'horas': HorasId;
  'log': LogId;
  'ministraciones': MinistracionesId;
  'modulos': ModulosId;
  'permgrupos': PermgruposId;
  'permgruposmodulos': PermgruposmodulosId;
  'permusuariosmodulos': PermusuariosmodulosId;
  'presupuesto': PresupuestoId;
  'rhnominas': RhnominasId;
  'searchcampos': SearchcamposId;
  'searchoperador': SearchoperadorId;
  'usuarios': UsuariosId;
}

type Initializer =
  | Catestatusplaza
  | CategoriasInitializer
  | CalendariosInitializer
  | CatcentrostrabajoInitializer
  | CatfuentefInitializer
  | CatlocalidadesInitializer
  | CatestadosInitializer
  | CatmunicipiosInitializer
  | CatplantelesInitializer
  | CatregionesInitializer
  | CattipocategoriaInitializer
  | CattiponominaInitializer
  | CatzonaeconomicaInitializer
  | CatzonageograficaInitializer
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
  | SearchcamposInitializer
  | SearchoperadorInitializer
  | UsuariosInitializer

interface InitializerTypeMap {
  'catestatusplaza':Catestatusplaza;
  'categorias': CategoriasInitializer;
  'calendarios': CalendariosInitializer;
  'catcentrostrabajo': CatcentrostrabajoInitializer;
  'catfuentef': CatfuentefInitializer;
  'catlocalidades': CatlocalidadesInitializer;
  'catestados': CatestadosInitializer;
  'catmunicipios': CatmunicipiosInitializer;
  'catplanteles': CatplantelesInitializer;
  'catregiones': CatregionesInitializer;
  'cattipocategoria': CattipocategoriaInitializer;
  'cattiponomina': CattiponominaInitializer;
  'catzonaeconomica': CatzonaeconomicaInitializer;
  'catzonageografica': CatzonageograficaInitializer;
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
  'searchcampos': SearchcamposInitializer;
  'searchoperador': SearchoperadorInitializer;
  'usuarios': UsuariosInitializer;
}

export {
  Catestatusplaza, CatestatusplazaInitializer, CatestatusplazaId,
  Categorias, CategoriasInitializer, CategoriasId,
  Calendarios, CalendariosInitializer, CalendariosId,
  Catcentrostrabajo, CatcentrostrabajoInitializer,
  Catfuentef, CatfuentefInitializer, CatfuentefId,
  Catlocalidades, CatlocalidadesInitializer,
  Catestados, CatestadosInitializer,
  Catmunicipios, CatmunicipiosInitializer,
  Catplanteles, CatplantelesInitializer,
  Catregiones, CatregionesInitializer,
  Cattipocategoria, CattipocategoriaInitializer,
  Cattiponomina, CattiponominaInitializer,
  Catzonaeconomica, CatzonaeconomicaInitializer, CatzonaeconomicaId,
  Catzonageografica, CatzonageograficaInitializer,
  Ejercicioreal, EjerciciorealInitializer, EjerciciorealId,
  Estudios, EstudiosInitializer, EstudiosId,
  Horas, HorasInitializer, HorasId,
  Log, LogInitializer, LogId,
  Ministraciones, MinistracionesInitializer, MinistracionesId,
  Modulos, ModulosInitializer, ModulosId,
  Permgrupos, PermgruposInitializer, PermgruposId,
  Permgruposmodulos, PermgruposmodulosInitializer, PermgruposmodulosId,
  Permusuariosmodulos, PermusuariosmodulosInitializer, PermusuariosmodulosId,
  Presupuesto, PresupuestoInitializer, PresupuestoId,
  Rhnominas, RhnominasInitializer, RhnominasId,
  Searchcampos, SearchcamposInitializer, SearchcamposId,
  Searchoperador, SearchoperadorInitializer, SearchoperadorId,
  Usuarios, UsuariosInitializer, UsuariosId,

  Model,
  ModelTypeMap,
  ModelId,
  ModelIdTypeMap,
  Initializer,
  InitializerTypeMap
};
