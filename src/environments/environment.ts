// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  //APIS_URL:"https://app.visorplus.mx/sirh_backend/api",
  APIS_URL:"http://localhost:8080/api",
  production: false
};

export const actionsButtonSave = {
  ver:"Cerrar",
  nuevo: "Guardar",
  editar: "Guardar",
  cancelar: "Cancelar",
};

export const titulosModal = {
  ver:"Consultar",
  nuevo: "Nuevo",
  editar: "Editar",
  cancelar: "Cancelar",
};


