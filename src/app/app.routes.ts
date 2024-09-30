import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './components/roles/admin/admin.component';
import { DistritosListComponent } from './components/distritos/distritos-list/distritos-list.component';
import { DistritosCreateComponent } from './components/distritos/distritos-create/distritos-create.component';
import { DistritosEditComponent } from './components/distritos/distritos-edit/distritos-edit.component';
import { EmpleadosCreateComponent } from './components/Empleados/empleados-create/empleados-create.component';
import { EmpleadosEditComponent } from './components/Empleados/empleados-edit/empleados-edit.component';
import { EmpleadosListComponent } from './components/Empleados/empleados-list/empleados-list.component';
import { TareasListComponent } from './components/tareas/tareas-list/tareas-list.component';
import { TareasCreateComponent } from './components/tareas/tareas-create/tareas-create.component';
import { TareasEditComponent } from './components/tareas/tareas-edit/tareas-edit.component';
import { EmpleadoComponent } from './components/roles/empleado/empleado.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'distritos/list', component: DistritosListComponent },
  { path: 'distritos/create', component: DistritosCreateComponent },
  { path: 'distritos/edit/:id', component: DistritosEditComponent },
  //{ path: '', redirectTo: '/distritos', pathMatch: 'full' },
  { path: 'empleados/list', component: EmpleadosListComponent},
  { path: 'empleados/create', component: EmpleadosCreateComponent },
  { path: 'empleados/edit/:id', component: EmpleadosEditComponent },
  //{ path: '', redirectTo: 'empleados', pathMatch: 'full'},
  { path: 'tareas/list', component: TareasListComponent},
  { path: 'tareas/create', component: TareasCreateComponent},
  { path: 'tareas/edit/:id', component: TareasEditComponent},

  { path: 'informe/', component: EmpleadoComponent}

];

export { routes };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
