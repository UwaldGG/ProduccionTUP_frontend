import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DistritosListComponent } from './components/distritos/distritos-list/distritos-list.component';
import { DistritosCreateComponent } from './components/distritos/distritos-create/distritos-create.component';
import { DistritosEditComponent } from './components/distritos/distritos-edit/distritos-edit.component';
import { EmpleadosCreateComponent } from './components/Empleados/empleados-create/empleados-create.component';
import { EmpleadosEditComponent } from './components/Empleados/empleados-edit/empleados-edit.component';
import { EmpleadosListComponent } from './components/Empleados/empleados-list/empleados-list.component';

const routes: Routes = [
  { path: 'distritos/list', component: DistritosListComponent },
  { path: 'distritos/create', component: DistritosCreateComponent },
  { path: 'distritos/edit/:id', component: DistritosEditComponent },
  //{ path: '', redirectTo: '/distritos', pathMatch: 'full' },
  { path: 'empleados/list', component: EmpleadosListComponent},
  { path: 'empleados/create', component: EmpleadosCreateComponent },
  { path: 'empleados/edit/:id', component: EmpleadosEditComponent },
  { path: '', redirectTo: 'empleados', pathMatch: 'full'},

  // Redirige a distritos por defecto
];

export { routes };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
