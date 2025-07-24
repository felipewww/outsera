import { Routes } from '@angular/router';
import {Home} from './home/home';
import {List} from './list/list';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'list',
    component: List
  }
];
