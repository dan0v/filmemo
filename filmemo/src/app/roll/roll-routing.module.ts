import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RollPage } from './roll.page';

const routes: Routes = [
  {
    path: '',
    component: RollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RollPageRoutingModule {}
