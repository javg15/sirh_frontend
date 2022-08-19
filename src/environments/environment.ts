// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  APIS_URL:"http://localhost:8080/api",
  URL:"http://localhost:8080/",
  /*APIS_URL: "http://44.234.213.105:8082/api",
  URL: "http://44.234.213.105:8082/",
  /*APIS_URL: "http://35.81.143.160:8082/api",
  URL: "http://35.81.143.160:8082/",*/
  /*APIS_URL: "http://20.58.11.140:8080/api",
  URL: "http://20.58.11.140:8080/",*/
  production: false
};

export const actionsButtonSave = {
  ver: "Cerrar",
  nuevo: "Guardar",
  editar: "Guardar",
  cancelar: "Cancelar",
  eliminar: "Eliminar",
  desactivar: "Desactivar",
  copiar: "Copiar",
  comisionar: "Guardar",
};

export const titulosModal = {
  ver: "Consultar",
  nuevo: "Nuevo",
  editar: "Editar",
  cancelar: "Cancelar",
  eliminar: "Eliminar",
  desactivar: "Desactivar",
  copiar: "Copiar",
  comisionar: "Editar",
};


