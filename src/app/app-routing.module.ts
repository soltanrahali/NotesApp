import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { CreateNoteComponent } from './create-note/create-note.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './layout/login/login.component';
import { ListOfNotesComponent } from './list-of-notes/list-of-notes.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'all', component: ListOfNotesComponent, canActivate: [AuthGuard]},
      { path: 'create', component: CreateNoteComponent, canActivate: [AuthGuard]},
      { path: 'edit/:id', component: CreateNoteComponent,  canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
