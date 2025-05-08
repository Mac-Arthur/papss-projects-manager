import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';
import { HomeComponent } from '../components/home/home.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { AddBankComponent } from '../components/add-bank/add-bank.component';
import { UpdateBankComponent } from '../components/update-bank/update-bank.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'add', component: AddBankComponent, title: 'Add' },
      { path: 'edit/:id', component: UpdateBankComponent, title: 'Edit' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
