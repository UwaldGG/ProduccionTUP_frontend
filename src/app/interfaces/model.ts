export interface Distrito {
  ID_Distrito: number;
  Coordinador: String;
  NombreDistrito: string;
}

export interface EmpleadosTareas {
  ID_Dato: number;
  mes: number;
  cantidad: number;
  anio: number;
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


export interface TareaTabla {
  tareaNumero: number;
  tareaNombre: string;
  valoresMeses: {
    ENE: any;
    FEB: any;
    MAR: any;
    ABR: any;
    MAY: any;
    JUN: any;
    JUL: any;
    AGO: any;
    SEP: any;
    OCT: any;
    NOV: any;
    DIC: any;
  };
}



export interface DatosTareaEmpleado {
  fk_tarea: number;
  valoresMeses: { [key: string]: number }; 
}

export interface DatoActualizar {
  fk_tarea: number;
  mes: number;
  cantidad: number;
}
