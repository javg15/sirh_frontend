// Automatically generated. Don't change this file manually.

import Calendarios, { CalendariosInitializer, CalendariosId } from './calendarios';
import Catcentrostrabajo, { CatcentrostrabajoInitializer } from './catcentrostrabajo';
import Categorias, { CategoriasInitializer, CategoriasId } from './categorias';
import Categoriastabular, { CategoriastabularInitializer } from './categoriastabular';
import Categoriassueldos, { CategoriassueldosInitializer, CategoriassueldosId } from './categoriassueldos';
import Catestados, { CatestadosInitializer } from './catestados';
import Catestatusplaza, { CatestatusplazaInitializer } from './catestatusplaza';
import Catfuentef, { CatfuentefInitializer, CatfuentefId } from './catfuentef';
import Catlocalidades, { CatlocalidadesInitializer } from './catlocalidades';
import Catmunicipios, { CatmunicipiosInitializer, CatmunicipiosId } from './catmunicipios';
import Catplanteles, { CatplantelesInitializer, CatplantelesId } from './catplanteles';
import Catquincena, { CatquincenaInitializer, CatquincenaId } from './catquincena';
import Catregiones, { CatregionesInitializer } from './catregiones';
import Catplantillas, { CatplantillasInitializer } from './catplantillas';
import Cattipocategoria, { CattipocategoriaInitializer } from './cattipocategoria';
import Cattipocentrotrabajo, { CattipocentrotrabajoInitializer } from './cattipocentrotrabajo';
import Catturnos, { CatturnosInitializer } from './catturnos';
import Catestadocivil, { CatestadocivilInitializer } from './catestadocivil';
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
import Plazas, { PlazasInitializer } from './plazas';
import Personal, { PersonalInitializer } from './personal';
import Plantillaspersonal, { PlantillaspersonalInitializer } from './plantillaspersonal';
import Plantillaspersonaldocs, { PlantillaspersonaldocsInitializer } from './plantillaspersonaldocs';
import Plantillasdocsfamiliares, { PlantillasdocsfamiliaresInitializer } from './plantillasdocsfamiliares';
import Plantillasdocslicencias, { PlantillasdocslicenciasInitializer } from './plantillasdocslicencias';
import Plantillasdocsnombramiento, { PlantillasdocsnombramientoInitializer } from './plantillasdocsnombramiento';
import Plantillasdocsprofesional, { PlantillasdocsprofesionalInitializer } from './plantillasdocsprofesional';
import Presupuesto, { PresupuestoInitializer, PresupuestoId } from './presupuesto';
import Rhnominas, { RhnominasInitializer, RhnominasId } from './rhnominas';
import Searchcampos, { SearchcamposInitializer, SearchcamposId } from './searchcampos';
import Searchoperador, { SearchoperadorInitializer, SearchoperadorId } from './searchoperador';
import Usuarios, { UsuariosInitializer, UsuariosId } from './usuarios';
import Archivos, { ArchivosInitializer } from './archivos';

type Model =
  | Archivos
  | Calendarios
  | Catcentrostrabajo
  | Categorias
  | Categoriastabular
  | Categoriassueldos
  | Catestados
  | Catestatusplaza
  | Catfuentef
  | Catlocalidades
  | Catmunicipios
  | Catplanteles
  | Catquincena
  | Catregiones
  | Catplantillas
  | Cattipocategoria
  | Cattipocentrotrabajo
  | Catturnos
  | Catestadocivil
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
  | Plazas
  | Personal
  | Plantillaspersonal
  | Plantillaspersonaldocs
  | Plantillasdocsfamiliares
  | Plantillasdocslicencias
  | Plantillasdocsnombramiento
  | Plantillasdocsprofesional
  | Presupuesto
  | Rhnominas
  | Searchcampos
  | Searchoperador
  | Usuarios

interface ModelTypeMap {
  'archivos': Archivos;
  'calendarios': Calendarios;
  'catcentrostrabajo': Catcentrostrabajo;
  'categorias': Categorias;
  'categoriastabular': Categoriastabular;
  'categoriassueldos': Categoriassueldos;
  'catestados': Catestados;
  'catestatusplaza': Catestatusplaza;
  'catfuentef': Catfuentef;
  'catlocalidades': Catlocalidades;
  'catmunicipios': Catmunicipios;
  'catplanteles': Catplanteles;
  'catquincena': Catquincena;
  'catregiones': Catregiones;
  'catplantillas': Catplantillas;
  'cattipocategoria': Cattipocategoria;
  'cattipocentrotrabajo': Cattipocentrotrabajo;
  'catturnos': Catturnos;
  'catestadocivil': Catestadocivil;
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
  'plazas': Plazas;
  'personal': Personal;
  'plantillaspersonal': Plantillaspersonal;
  'plantillaspersonaldocs': Plantillaspersonaldocs;
  'plantillasdocsnombramiento':Plantillasdocsnombramiento;
  'plantillasdocsfamiliares':Plantillasdocsfamiliares;
  'plantillasdocslicencias':Plantillasdocslicencias;
  'plantillasdocsprofesional':Plantillasdocsprofesional;
  'presupuesto': Presupuesto;
  'rhnominas': Rhnominas;
  'searchcampos': Searchcampos;
  'searchoperador': Searchoperador;
  'usuarios': Usuarios;
}

type ModelId =
  | CalendariosId
  | CategoriasId
  | CategoriassueldosId
  | CatfuentefId
  | CatmunicipiosId
  | CatplantelesId
  | CatquincenaId
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
  'calendarios': CalendariosId;
  'categorias': CategoriasId;
  'categoriassueldos': CategoriassueldosId;
  'catfuentef': CatfuentefId;
  'catmunicipios': CatmunicipiosId;
  'catplanteles': CatplantelesId;
  'catquincena': CatquincenaId;
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
  | ArchivosInitializer
  | CalendariosInitializer
  | CatcentrostrabajoInitializer
  | CategoriasInitializer
  | CategoriastabularInitializer
  | CategoriassueldosInitializer
  | CatestadosInitializer
  | CatestatusplazaInitializer
  | CatfuentefInitializer
  | CatlocalidadesInitializer
  | CatmunicipiosInitializer
  | CatplantelesInitializer
  | CatquincenaInitializer
  | CatregionesInitializer
  | CatplantillasInitializer
  | CattipocategoriaInitializer
  | CattipocentrotrabajoInitializer
  | CatturnosInitializer
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
  | PlazasInitializer
  | PresupuestoInitializer
  | RhnominasInitializer
  | SearchcamposInitializer
  | SearchoperadorInitializer
  | UsuariosInitializer

interface InitializerTypeMap {
  'archivos': ArchivosInitializer;
  'calendarios': CalendariosInitializer;
  'catcentrostrabajo': CatcentrostrabajoInitializer;
  'categorias': CategoriasInitializer;
  'categoriastabular': CategoriastabularInitializer;
  'categoriassueldos': CategoriassueldosInitializer;
  'catestados': CatestadosInitializer;
  'catestatusplaza': CatestatusplazaInitializer;
  'catfuentef': CatfuentefInitializer;
  'catlocalidades': CatlocalidadesInitializer;
  'catmunicipios': CatmunicipiosInitializer;
  'catplanteles': CatplantelesInitializer;
  'catquincena': CatquincenaInitializer;
  'catregiones': CatregionesInitializer;
  'catplantillas': CatplantillasInitializer;
  'cattipocategoria': CattipocategoriaInitializer;
  'cattipocentrotrabajo': CattipocentrotrabajoInitializer;
  'catturnos': CatturnosInitializer;
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
  'plazas': PlazasInitializer;
  'personal': PersonalInitializer;
  'plantillaspersonal': PlantillaspersonalInitializer;
  'plantillaspersonaldocs': Plantillaspersonaldocs;
  'plantillasdocsprofesional': Plantillasdocsprofesional;
  'plantillasdocsnombramiento': Plantillasdocsnombramiento;
  'plantillasdocsfamiliares': Plantillasdocsfamiliares;
  'plantillasdocslicencias': Plantillasdocslicencias;
  'presupuesto': PresupuestoInitializer;
  'rhnominas': RhnominasInitializer;
  'searchcampos': SearchcamposInitializer;
  'searchoperador': SearchoperadorInitializer;
  'usuarios': UsuariosInitializer;
}

export {
  Archivos, ArchivosInitializer,
  Calendarios, CalendariosInitializer, CalendariosId,
  Catcentrostrabajo, CatcentrostrabajoInitializer,
  Categorias, CategoriasInitializer, CategoriasId,
  Categoriastabular, CategoriastabularInitializer,
  Categoriassueldos, CategoriassueldosInitializer, CategoriassueldosId,
  Catestados, CatestadosInitializer,
  Catestatusplaza, CatestatusplazaInitializer,
  Catfuentef, CatfuentefInitializer, CatfuentefId,
  Catlocalidades, CatlocalidadesInitializer,
  Catmunicipios, CatmunicipiosInitializer, CatmunicipiosId,
  Catplanteles, CatplantelesInitializer, CatplantelesId,
  Catquincena, CatquincenaInitializer, CatquincenaId,
  Catregiones, CatregionesInitializer,
  Catplantillas, CatplantillasInitializer,
  Cattipocategoria, CattipocategoriaInitializer,
  Cattipocentrotrabajo, CattipocentrotrabajoInitializer,
  Catturnos, CatturnosInitializer,
  Catestadocivil, CatestadocivilInitializer,
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
  Plazas, PlazasInitializer,
  Personal, PersonalInitializer,
  Plantillaspersonal, PlantillaspersonalInitializer,
  Plantillaspersonaldocs, PlantillaspersonaldocsInitializer,
  Plantillasdocsfamiliares, PlantillasdocsfamiliaresInitializer,
  Plantillasdocslicencias, PlantillasdocslicenciasInitializer,
  Plantillasdocsnombramiento, PlantillasdocsnombramientoInitializer,
  Plantillasdocsprofesional, PlantillasdocsprofesionalInitializer,
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
