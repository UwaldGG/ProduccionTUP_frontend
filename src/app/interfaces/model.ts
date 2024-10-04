export interface Distrito {
  ID_Distrito: number;
  Coordinador: String;
  NombreDistrito: string;
}

export interface EmpleadosTareas {
  ID_Dato: number;
  Mes: number;
  Valor: number;
  Año: number;
}

export interface Empleado {
  ID_Empleado: number;
  Nombre: string;
  Apellido: string;
}

export interface Tarea {
  distrito: {
      ID_Distrito: number;
      NombreDistrito: string;
      Coordinador: string;
  };
  empleado: {
      Nombre: string;
  };
  valores: { [Mes: string]: number };
}


