export interface Distrito {
  ID_Distrito: number;
  Coordinador: string;
  NombreDistrito: string;
}

export interface EmpleadosTareas {
  ID_Dato: number;
  mes: string;  // Cambiado a string para reflejar que en la base de datos es un string
  cantidad: number;
  anio: number;
  fk_tarea: number; // Referencia a la tarea
  fk_empleado: number; // Referencia al empleado
  fk_distrito: number; // Referencia al distrito
}

export interface Empleado {
  ID_Empleado: number;  // ID del empleado
  Nombre: string;
  Apellido: string;
}

export interface Tarea {
  ID_Tarea: number;  // ID de la tarea
  Descripcion: string; // Descripción de la tarea
  empleados_tareas?: EmpleadosTareas[]; // Relación con empleados_tareas (opcional)
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
  ID_Dato: number;
  anio: number;
  cantidad: number; // Aquí tienes la cantidad de la tarea para el mes
  fk_distrito: number;
  fk_empleado: number;
  fk_tarea: number; // ID de la tarea
  mes: number; // Número del mes (1-12)
  valoresMeses: { [key: string]: number }; 
  total: number;
}




export interface DatoActualizar {
  fk_tarea: number;
  mes: number;
  cantidad: number;
}
